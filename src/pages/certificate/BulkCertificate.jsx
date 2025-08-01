import { useEffect, useState } from "react";
import { UseSingle } from "../../hooks/useSingle";
import LandingSingle from "../../components/singleParts/LandingSingle";
import { useSelector } from "react-redux";
import InlineLoader from "../../components/ui/InlineLoader";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import {
  sendMailCertClearance,
  sendMailWithCertificate,
} from "../../api/certificateService";
import { bulkCertFieldConfigs } from "../../utils/certificateFields";
import ProgressBarDialog from "../../components/ui/Progress";

export default function BulkCertificate() {
  const { innerloading } = useSelector((state) => state.auth);
  const { placeholders } = useSelector((state) => state.temp);
  const {
    CreateNewCertificate,
    text,
    type,
    studentCertificates,
    setStudentCertificates,
    studentFormData,
    setStudentFormData,
    certificateRef,
    currentProgress,
    resolveCapture,
    setResolveCapture,
    isRendering,
    setIsRendering,
    cssEditorContent,
    setProgressModal,
    setProgress,
    progressModal,
    progress,
  } = UseSingle();

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
        Saluation_1: salutation_1,
        Saluation_2: salutation_2,
        Saluation_3: salutation_3,
        Saluation_4: salutation_4,
      }));
    }
  }, [setStudentFormData, studentFormData.Titels, type]);

  const currentConfig =
    bulkCertFieldConfigs[type] || bulkCertFieldConfigs["free"];

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

  const handleDownloadDemoXlsx = () => {
    if (!currentConfig.xlsxdata) return;

    const worksheet = XLSX.utils.json_to_sheet(currentConfig.xlsxdata);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const fileName = currentConfig.fileName || "Certificate_Data.xlsx";
    XLSX.writeFile(workbook, fileName);
  };

  useEffect(() => {
    if (isRendering && resolveCapture) {
      setTimeout(async () => {
        if (certificateRef.current) {
          const canvas = await html2canvas(certificateRef.current, {
            scale: 3,
            logging: false,
            dpi: 300,
          });
          const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
          resolveCapture(dataUrl);
        }
      }, 500); // Adjust if necessary for rendering delay
    }
  }, [studentFormData, isRendering, resolveCapture, certificateRef]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setStudentCertificates(parsedData);
      } catch (error) {
        console.error("Error reading file:", error);
        alert("Error reading file. Please make sure it's a valid .xlsx file.");
      }
    } else {
      alert("No file selected or file is not valid.");
    }
  };

  const handleDownloadCertificate = async () => {
    setProgressModal(true);
    const zip = new JSZip();
    const totalCertificates = studentCertificates.length;
    const progressIncrement = 100 / totalCertificates;

    for (let studentCert of studentCertificates) {
      if (studentCert.Titels !== "") {
        let salutation_1 = "";
        let salutation_2 = "";
        let salutation_3 = "";
        let salutation_4 = "";
        switch (studentCert.Titels) {
          case "Mr":
            salutation_1 = "he";
            salutation_2 = "his";
            salutation_3 = "him";
            salutation_4 = "He";
            break;
          case "Mrs":
          case "Miss":
            salutation_1 = "she";
            salutation_2 = "her";
            salutation_3 = "her";
            salutation_4 = "She";
            break;
          default:
            break;
        }
        studentCert.Salutation_1 = salutation_1;
        studentCert.Salutation_2 = salutation_2;
        studentCert.Salutation_3 = salutation_3;
        studentCert.Salutation_4 = salutation_4;

        setStudentFormData((oldData) => ({
          ...oldData,
          Salutation_1: salutation_1,
          Salutation_2: salutation_2,
          Salutation_3: salutation_3,
          Salutation_4: salutation_4,
        }));
      }

      const cleanedPlaceholders = placeholders.map(({ key, display }) => ({
        key,
        display,
      }));

      const certificateDetails = {
        CertTemplate: type,
        Mode: studentCert.Mode,
        placeholders: cleanedPlaceholders,
        textFormat: generatedText,
        styleFormat: cssEditorContent,
        ...studentCert,
      };

      const data = await CreateNewCertificate(certificateDetails);
      if (!data) {
        alert("Failed to create certificate.");
        return;
      }

      await setStudentFormData((prev) => ({
        ...prev,
        _id: data._id,
      }));

      await captureCertificate(studentCert);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 8,
        logging: false,
        dpi: 800,
      });

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgData = canvas.toDataURL("image/jpeg", 8.0);

      const pdf = new jsPDF({
        orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
        unit: "pt",
        format: [canvasWidth, canvasHeight],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvasWidth, canvasHeight);

      const pdfData = pdf.output("blob");
      zip.file(`${studentCert.StudentName}.pdf`, pdfData);

      // Send Email the PDF with the certificate number
      const pdfBlob = pdf.output("blob");
      const formData = new FormData();
      formData.append(
        "document",
        pdfBlob,
        `${studentCert.CertificateNo || studentCert?.StudentName}.pdf`
      );
      formData.append("certId", studentCert?.CertificateNo);
      formData.append("email", studentCert?.recipientEmail || "");
      formData.append("Titels", studentCert?.Titels || "");
      formData.append("StudentName", studentCert?.StudentName || "");
      formData.append("Course", studentCert?.Course || "");

      if (type === "clearance") {
        await sendMailCertClearance(formData);
      } else {
        await sendMailWithCertificate(formData);
      }

      currentProgress.current += progressIncrement;
      setProgress(Math.min(currentProgress.current, 100));
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "certificates.zip");
    setProgressModal(false);
    setStudentCertificates([]);
    setProgressModal(false);
    setProgress(0);
  };

  const captureCertificate = (studentCert) => {
    return new Promise((resolve) => {
      setStudentFormData((prev) => ({
        ...studentCert,
        CollegeImage: prev.CollegeImage,
        Signature1: prev.Signature1,
        Signature2: prev.Signature2,
        Signature3: prev.Signature3,
        Signature4: prev.Signature4,
      }));
      setResolveCapture(() => resolve);
      setIsRendering(true);
    });
  };

  return (
    <>
      {innerloading ? (
        <InlineLoader />
      ) : (
        <LandingSingle
          fieldConfigs={currentConfig.fields}
          placeholders={placeholders}
          generatedText={generatedText}
          handleDownloadDemoXlsx={handleDownloadDemoXlsx}
          handleFileUpload={handleFileUpload}
          handleSaveAndDownloadPDF={handleDownloadCertificate}
        />
      )}

      {/* Always mounted */}
      <ProgressBarDialog loaderOpen={progressModal} progress={progress} />
    </>
  );
}
