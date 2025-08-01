import styles from "./LandingSingle.module.css";
import { Button } from "../ui/Button";
import { FiSettings, FiSave } from "react-icons/fi";
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

import { useSelector } from "react-redux";
import InlineLoader from "../ui/InlineLoader";


export default function LandingSingle({
  fieldConfigs,
  placeholders,
  generatedText,
  handleDownloadDemoXlsx,
  handleFileUpload,
  handleSaveAndDownloadPDF,
}) {
  const { innerloading } = useSelector((state) => state.auth);
  const {
    studentFormData,
    setStudentFormData,
    certificateRef,
    UpdateStyleTemp,
    text,
    setText,
    cssEditorContent,
    setCssEditorContent,
    type,
    zoom,
    position,
    isDragging,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    fontFamily,
    setFontFamily,
    fontStyles,
    textColor,
    setTextColor,
    tempSetting,
    handleTempSetting,
 
  } = UseSingle();

  const crumbs = useBreadcrumb();

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
              onClick={handleDownloadDemoXlsx}
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
            handleSubmit={handleSaveAndDownloadPDF}
            handleFileUpload={handleFileUpload}
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
        </div>
      </div>
    </div>
  );
}
