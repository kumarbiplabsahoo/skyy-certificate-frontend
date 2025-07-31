import styles from "./LandingSingle.module.css";
import { Button } from "../ui/Button";
import { FiSettings, FiSave } from "react-icons/fi";
import * as XLSX from "xlsx";
import FreeCourceTemp from "../templates/FreeCoruseTemp";
import FormComponent from "../FormComponent";
import TextEditer from "../singleParts/textEditer";
import AsdcTemp from "../templates/AsdcTemp";
import PaidTemp from "../templates/PaidTemp";
import Breadcrumbs from "../ui/Breadcrumbs";
import ShortTermTemp from "../templates/ShortTerm";
import CollegeTemp from "../templates/CollegeTemp";
import PgpTemp from "../templates/PgpTemp";
import LORTemp from "../templates/LOR";
import InternshipTemp from "../templates/InternshipTemp";
import BonafiedTemp from "../templates/BonafiedTemp";
import ClearanceTemp from "../templates/ClearanceTemp";
import { UseSingle } from "../../hooks/useSingle";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import {
  sendMailCertClearance,
  sendMailWithCertificate,
} from "../../api/certificateService";
import { startInnerLoad, stopInnerLoad } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import InlineLoader from "../ui/InlineLoader";

export default function LandingSingle({
  fieldConfigs,
  fieldDataxlsx,
  fieldFileName,
  text,
  setText,
  cssEditorContent,
  setCssEditorContent,
  generatedText,
  studentFormData,
  setStudentFormData,
  type,
  zoom,
  position,
  isDragging,
  handleWheel,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  // getTextareaStyle,
  fontFamily,
  setFontFamily,
  fontStyles,
  textColor,
  setTextColor,
  tempSetting,
  handleTempSetting,
  placeholders,
}) {
  const { innerloading } = useSelector((state) => state.auth);
  const { CreateNewCertificate, UpdateStyleTemp } = UseSingle();
  const certificateRef = useRef(null);
  const crumbs = useBreadcrumb();
  const dispatch = useDispatch();

  const renderCertificateImage = () => {
    if (innerloading) {
      return (
        <div className={styles.loaderWrapper}>
          <InlineLoader />
        </div>
      );
    }

    const props = {
      ref: certificateRef,
      zoom,
      position,
      isDragging,
      activeCSS: cssEditorContent,
      textTemplate: text,
      fontStyles,
      textColor,
      fontFamily,
      certData: studentFormData,
    };

    switch (type) {
      case "free":
        return <FreeCourceTemp {...props} />;
      case "asdc":
        return <AsdcTemp {...props} />;
      case "paid":
        return <PaidTemp {...props} />;
      case "college":
        return <CollegeTemp {...props} />;
      case "shortterm":
        return <ShortTermTemp {...props} />;
      case "pgp":
        return <PgpTemp {...props} />;
      case "lor":
        return <LORTemp {...props} />;
      case "internship":
        return <InternshipTemp {...props} />;
      case "bonafied":
        return <BonafiedTemp {...props} />;
      case "clearance":
        return <ClearanceTemp {...props} />;
      default:
        return <div>Invalid template type</div>;
    }
  };

  const handleDownload = () => {
    if (!fieldDataxlsx) return;

    const worksheet = XLSX.utils.json_to_sheet(fieldDataxlsx);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const fileName = fieldFileName || "Certificate_Data.xlsx";
    XLSX.writeFile(workbook, fileName);
  };

  const handleSave = async () => {
    dispatch(startInnerLoad());
    try {
      // 1. Prepare certificate details, using CertificateNo as QrId
      const cleanedPlaceholders = placeholders.map(({ key, display }) => ({
        key,
        display,
      }));

      const certificateDetails = {
        ...studentFormData,
        QrId: studentFormData.CertificateNo, // Use CertificateNo as QrId
        placeholders: cleanedPlaceholders,
        textFormat: generatedText,
        styleFormat: cssEditorContent,
      };

      // 2. Create certificate in backend
      const data = await CreateNewCertificate(certificateDetails);
      if (!data) {
        alert("Failed to create certificate.");
        dispatch(stopInnerLoad());
        setStudentFormData((prev) => ({
          ...prev,
          _id: data._id,
        }));
        return;
      }
    } catch (error) {
      console.error("Error in handleSaveAndDownload:", error);
      alert(
        "Failed to save and download certificate. Please check the console for details."
      );
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  const handleDownloadPDF = async () => {
    dispatch(startInnerLoad());
    try {
      if (!certificateRef.current) {
        alert("Certificate preview is not ready.");
        dispatch(stopInnerLoad());
        return;
      }

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

      alert("Certificate saved and sent successfully!");
    } catch (error) {
      console.error("Error in handleDownloadPDF:", error);
      alert(
        "Failed to download certificate. Please check the console for details."
      );
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  return (
    <div className={styles.singleCertificate}>
      <div className={styles.header}>
        <Breadcrumbs />
        <button className={styles.settingsButton} onClick={handleTempSetting}>
          <FiSettings size={18} />
        </button>
      </div>

      {tempSetting && (
        <div className={styles.editorRow}>
          <TextEditer
            text={text}
            setText={setText}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            textColor={textColor}
            setTextColor={setTextColor}
            placeholders={placeholders}
            generatedText={generatedText}
          />

          <div className={styles.cssEditorContainer}>
            <textarea
              className={styles.cssEditor}
              value={cssEditorContent}
              onChange={(e) => setCssEditorContent(e.target.value)}
              placeholder="Write your CSS here..."
            />
            <div className={styles.cssEditorHeader}>
              <Button
                type="button"
                onClick={() => UpdateStyleTemp(cssEditorContent)}
                className={styles.saveCSSButton}
              >
                <FiSave /> Save CSS
              </Button>
            </div>
          </div>
        </div>
      )}

      {crumbs[0] === "Bulk" && (
        <div className={styles.noticeContainer}>
          <div className={styles.noticeHeader}>
            <h2>Demo Files Download</h2>
            <button
              className={styles.demodownloadButton}
              onClick={handleDownload}
            >
              Demo xlsx
            </button>
          </div>
          <div className={styles.noticeContent}>
            <p className={styles.noticeText}>
              Click the button below to download demo Excel files for different
              template types. These files demonstrate various formatting options
              and template structures.
            </p>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.formSection}>
          <FormComponent
            formData={studentFormData}
            setFormData={setStudentFormData}
            elements={fieldConfigs}
            ButtonTitle="SAVE AND SEND"
            handleSubmit={handleSave}
          />
        </div>

        <div className={styles.certificate}>
          <div
            className={styles.zoomWrapper}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {renderCertificateImage()}
          </div>

          <Button
            type="button"
            className={styles.downloadButton}
            onClick={handleDownloadPDF}
          >
            Download Certificate
          </Button>
        </div>
      </div>
    </div>
  );
}
