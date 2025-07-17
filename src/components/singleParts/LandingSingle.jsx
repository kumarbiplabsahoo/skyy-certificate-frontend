import styles from "./LandingSingle.module.css";
import { Button } from "../ui/Button";
import { FiSettings, FiSave } from "react-icons/fi";
// import PGPTemp from "../templates/PGP";
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

export default function LandingSingle({
  fieldConfigs,
  text,
  setText,
  cssEditorContent,
  setCssEditorContent,
  generateCertificateText,
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
  getTextareaStyle,
  fontFamily,
  setFontFamily,
  fontStyles,
  textColor,
  setTextColor,
  tempSetting,
  handleTempSetting,
  placeholders,
}) {
  const handleSave = () => {
    const finalCertificate = {
      content: generateCertificateText(),
      styling: getTextareaStyle(),
      formData: studentFormData,
    };
    console.log("Certificate saved:", finalCertificate);
    alert("Certificate saved successfully!");
  };

  const handleSaveCSS = () => {
    alert("CSS saved successfully!");
  };

  const renderCertificateImage = () => {
    if (type === "free") {
      return (
        <FreeCourceTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
    if (type === "asdc") {
      return (
        <AsdcTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
    if (type === "paid") {
      return (
        <PaidTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
    if (type === "college") {
      return (
        <CollegeTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
    if (type === "shortterm") {
      return (
        <ShortTermTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
    if (type === "pgp") {
      return (
        <PgpTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
    if (type === "lor") {
      return (
        <LORTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
    if (type === "internship") {
      return (
        <InternshipTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
    if (type === "bonafied") {
      return (
        <BonafiedTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
     if (type === "clearance") {
      return (
        <ClearanceTemp
          zoom={zoom}
          position={position}
          isDragging={isDragging}
          activeCSS={cssEditorContent}
          textTemplate={text}
          fontStyles={fontStyles}
          textColor={textColor}
          fontFamily={fontFamily}
          certData={studentFormData}
        />
      );
    }
    return null;
  };

  return (
    <div className={styles.singleCertificate}>
      <div className={styles.header}>
        {/* <div className={styles.breadcrumbs}>
          <span className={styles.breadcrumb}>Free</span>
          <span className={styles.separator}>&gt;</span>
          <span className={styles.breadcrumb}>Single</span>
          <span className={styles.separator}>&gt;</span>
          <span className={styles.activeBreadcrumb}>{type}</span>
        </div> */}
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
            generateCertificateText={generateCertificateText}
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
                onClick={handleSaveCSS}
                className={styles.saveCSSButton}
              >
                <FiSave /> Save CSS
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.formSection}>
          <FormComponent
            formData={studentFormData}
            setFormData={setStudentFormData}
            elements={fieldConfigs}
            ButtonTitle="SAVE"
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

          <Button type="button" className={styles.downloadButton}>
            Download Certificate
          </Button>
        </div>
      </div>
    </div>
  );
}
