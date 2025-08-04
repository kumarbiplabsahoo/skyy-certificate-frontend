import { useEffect, useState } from "react";
import { UseSingle } from "../../hooks/useSingle";
import LandingSingle from "../../components/singleParts/LandingSingle";
import { useDispatch, useSelector } from "react-redux";
import InlineLoader from "../../components/ui/InlineLoader";
import { singleCertFieldConfigs } from "../../utils/certificateFields";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  sendMailCertClearance,
  sendMailWithCertificate,
} from "../../api/certificateService";
import { startInnerLoad, stopInnerLoad } from "../../store/authSlice";

export default function SingleCertficate() {
  const { innerloading } = useSelector((state) => state.auth);
  const { placeholders } = useSelector((state) => state.temp);
  const {
    studentFormData,
    setStudentFormData,
    certificateRef,
    CreateNewCertificate,
    cssEditorContent,
    text,
    optionsForTitle,
    type,
    fontFamily,
  } = UseSingle();
  const dispatch = useDispatch();

  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    const title = studentFormData.Titels;

    if (title) {
      let salutation_1 = "";
      let salutation_2 = "";
      let salutation_3 = "";
      let salutation_4 = "";

      switch (title) {
        case "Mr.":
          salutation_1 = "he";
          salutation_2 = "his";
          salutation_3 = "him";
          salutation_4 = "He";
          break;
        case "Mrs.":
        case "Miss.":
          salutation_1 = "she";
          salutation_2 = "her";
          salutation_3 = "her";
          salutation_4 = "She";
          break;
        default:
          break;
      }

      setStudentFormData((prev) => ({
        ...prev,
        CertTemplate: type,
        Saluation_1: salutation_1,
        Saluation_2: salutation_2,
        Saluation_3: salutation_3,
        Saluation_4: salutation_4,
      }));
    }
  }, [setStudentFormData, studentFormData.Titels, type]);

  const currentConfig =
    singleCertFieldConfigs[type] || singleCertFieldConfigs["free"];

  const enrichedFields = currentConfig.fields.map((field) => {
    if (field.options === "optionsForTitle") {
      return { ...field, options: optionsForTitle };
    }
    return field;
  });

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  useEffect(() => {
    if (!text || !placeholders || placeholders.length === 0) return;
    let result = text;
    placeholders.forEach(({ key, display }) => {
      const escapedDisplay = escapeRegExp(display);
      result = result.replace(
        new RegExp(escapedDisplay, "g"),
        studentFormData[key] || `<${key}>`
      );
    });
    setGeneratedText(result);
  }, [text, placeholders, studentFormData]);

  const handleSaveAndDownloadPDF = async () => {
    dispatch(startInnerLoad());
    try {
      if (certificateRef.current) {
        // 1. Prepare certificate details
        const cleanedPlaceholders = placeholders.map(({ key, display }) => ({
          key,
          display,
        }));

        const certificateDetails = {
          ...studentFormData,
          QrId: studentFormData.CertificateNo,
          placeholders: cleanedPlaceholders,
          textFormat: generatedText,
          styleFormat: cssEditorContent,
          fontFamily: fontFamily,
        };

        // 2. Create certificate in backend
        const data = await CreateNewCertificate(certificateDetails);
        if (!data) {
          alert("Failed to create certificate.");
          return;
        }

        // Update _id in local state
        await setStudentFormData((prev) => ({
          ...prev,
          _id: data._id,
        }));

        // Ensure the template re-renders with the updated certificate data
        await new Promise((resolve) => setTimeout(resolve, 100));

        const canvas = await html2canvas(certificateRef.current, {
          scale: 8,
          logging: false,
          dpi: 800,
        });

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        const pdf = new jsPDF({
          orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
          unit: "pt",
          format: [canvasWidth, canvasHeight],
        });

        pdf.addImage(imgData, "JPEG", 0, 0, canvasWidth, canvasHeight);

        const fileName = studentFormData.CertificateNo
          ? `${studentFormData.CertificateNo}.pdf`
          : `${type || "certificate"}_${Date.now()}.pdf`;

        pdf.save(fileName);

        // 5. Prepare and send email
        const pdfBlob = pdf.output("blob");
        const formData = new FormData();
        formData.append("document", pdfBlob, fileName);
        formData.append("certId", studentFormData.CertificateNo);
        formData.append("email", studentFormData?.recipientEmail || "");
        formData.append("Titels", studentFormData?.Titels || "");
        formData.append("StudentName", studentFormData?.StudentName || "");
        formData.append("Course", studentFormData?.Course || "");

        if (type === "clearance") {
          await sendMailCertClearance(formData);
        } else {
          await sendMailWithCertificate(formData);
        }

        alert("Certificate saved, downloaded, and sent successfully!");
      }
    } catch (error) {
      console.error("Error in handleSaveAndDownloadPDF:", error);
      alert("Something went wrong. Please check the console for more details.");
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  return innerloading ? (
    <InlineLoader />
  ) : (
    <LandingSingle
      fieldConfigs={enrichedFields}
      placeholders={placeholders}
      generatedText={generatedText}
      handleDownloadDemoXlsx={() => {}}
      handleFileUpload={() => {}}
      handleSaveAndDownloadPDF={handleSaveAndDownloadPDF}
    />
  );
}
