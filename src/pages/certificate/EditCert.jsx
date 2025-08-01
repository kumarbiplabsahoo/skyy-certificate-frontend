import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InlineLoader from "../../components/ui/InlineLoader";
import LandingSingle from "../../components/singleParts/LandingSingle";
import { UseSingle } from "../../hooks/useSingle";
import { singleCertFieldConfigs } from "../../utils/certificateFields";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  sendMailCertClearance,
  sendMailWithCertificate,
} from "../../api/certificateService";
import { startInnerLoad, stopInnerLoad } from "../../store/authSlice";

export default function EditCert() {
  const { single_cert } = useSelector((state) => state.dash);
  const { innerloading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    studentFormData,
    setStudentFormData,
    setText,
    text,
    cssEditorContent,
    setCssEditorContent,
    optionsForTitle,
    UpdateOldCertificate,
    certificateRef,
  } = UseSingle();

  const [generatedText, setGeneratedText] = useState("");

  const certTemplateLower = single_cert?.CertTemplate?.toLowerCase() || "";
  const type = certTemplateLower.replace("course", "").trim();

  // Get field configs and inject optionsForTitle where needed
  const enrichedFields = useMemo(() => {
    const config =
      singleCertFieldConfigs[type] || singleCertFieldConfigs["free"];
    return config.fields.map((field) =>
      field.options === "optionsForTitle"
        ? { ...field, options: optionsForTitle }
        : field
    );
  }, [type, optionsForTitle]);

  // Helper function to remove 'st', 'nd', 'rd', 'th' from day part
  const parseCustomDate = (dateStr) => {
    if (!dateStr) return "";
    const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const parsedDate = new Date(cleaned);
    if (isNaN(parsedDate)) return "";

    // Format: YYYY-MM-DD
    return parsedDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (single_cert) {
      const { StartDate, EndDate, Date, ...rest } = single_cert;

      const updatedData = {
        ...rest,
        StartDate: parseCustomDate(StartDate),
        EndDate: parseCustomDate(EndDate),
        Date: parseCustomDate(Date),
      };

      setStudentFormData(updatedData);
      setText(single_cert?.textFormat || "");
      setCssEditorContent(single_cert?.styleFormat || "");
    }
  }, [single_cert, setText, setCssEditorContent, setStudentFormData]);

  useEffect(() => {
    if (!studentFormData?.Titels) return;

    const title = studentFormData.Titels;
    let sal1 = "",
      sal2 = "",
      sal3 = "",
      sal4 = "";

    if (title === "Mr.") {
      [sal1, sal2, sal3, sal4] = ["he", "his", "him", "He"];
    } else if (["Mrs.", "Miss."].includes(title)) {
      [sal1, sal2, sal3, sal4] = ["she", "her", "her", "She"];
    }

    setStudentFormData((prev) => ({
      ...prev,
      Saluation_1: sal1,
      Saluation_2: sal2,
      Saluation_3: sal3,
      Saluation_4: sal4,
    }));
  }, [studentFormData?.Titels, setStudentFormData]);

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  useEffect(() => {
    if (!text || !studentFormData?.placeholders?.length) return;
    let result = text;
    studentFormData.placeholders.forEach(({ key, display }) => {
      const escaped = escapeRegExp(display);
      result = result.replace(
        new RegExp(escaped, "g"),
        studentFormData[key] || `<${key}>`
      );
    });
    setGeneratedText(result);
  }, [text, studentFormData]);

  const handleUpdateAndDownloadPDF = async () => {
    dispatch(startInnerLoad());
    try {
      if (certificateRef.current) {
        // 1. Prepare certificate details
        const cleanedPlaceholders = single_cert?.placeholders.map(
          ({ key, display }) => ({
            key,
            display,
          })
        );

        const certificateDetails = {
          ...studentFormData,
          _id: single_cert?._id,
          QrId: studentFormData.CertificateNo,
          placeholders: cleanedPlaceholders,
          textFormat: generatedText,
          styleFormat: cssEditorContent,
        };

        // 2. Create certificate in backend
        const data = await UpdateOldCertificate(certificateDetails);
        if (!data) {
          alert("Failed to create certificate.");
          return;
        }

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

  if (innerloading || !studentFormData) return <InlineLoader />;

  return (
    <LandingSingle
      fieldConfigs={enrichedFields}
      placeholders={studentFormData.placeholders}
      generatedText={generatedText}
      handleDownloadDemoXlsx={() => {}}
      handleFileUpload={() => {}}
      handleSaveAndDownloadPDF={handleUpdateAndDownloadPDF}
    />
  );
}
