// Cleaned and optimized FreeCourse Certificate Builder

// --- FreeCourse.jsx ---
import { useState } from "react";
import { UseSingle } from "../../hooks/useSingle";
import LandingSingle from "../../components/singleParts/LandingSingle";
import { useParams } from "react-router-dom";

export default function SingleCerificate() {
  const { type } = useParams();
  const {
    optionsForTitle,
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
    setFontStyles,
    textColor,
    setTextColor,
    tempSetting,
    handleTempSetting,
  } = UseSingle();

  const [studentFormData, setStudentFormData] = useState({
    QrId: "",
    RegNo: "",
    CertificateNo: "",
    Titels: "",
    Saluation_1: "",
    Saluation_2: "",
    Saluation_3: "",
    Student_Designation: "",
    StudentName: "",
    Duration: "",
    CourseType: "",
    Mode: false,
    Course: "",
    CoursePrice: "",
    Collected_Amount: "",
    Outstanding_dues: "",
    Date: "",
    StartDate: "",
    EndDate: "",
    CollegeImage: null,
    CollegeName: "",
    Mng_Designation1: "",
    Mng_Desg_Add1: "",
    Mng_Designation2: "",
    Mng_Desg_Add2: "",
    Mng_Designation3: "",
    Mng_Desg_Add3: "",
    Mng_Designation4: "",
    Mng_Desg_Add4: "",
    Signature1: "",
    Signature2: "",
    Signature3: "",
    Signature4: "",
    recipientEmail: "",
  });

  const configMap = {
    free: {
      defaultText: `For Participating & Completing [Duration] Free Certified Program on "[Course Name]" Conducted on [Completion Date]`,
      placeholders: [
        { key: "Course", display: "[Course Name]" },
        { key: "Date", display: "[Completion Date]" },
        { key: "Duration", display: "[Duration]" },
      ],
      css: `
          .text-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }

          .description {
            position: absolute;
            top: 58%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70%;
            text-align: center;
            font-size: 0.8em;
            font-weight: 500;
            font-family: Arial, sans-serif;
            color: #000000;
          }`,
      fields: [
        {
          key: "CertificateNo",
          label: "Certificate Number",
          name: "CertificateNo",
          placeholder: "Certificate Number",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "recipientEmail",
          label: "Email ID",
          name: "recipientEmail",
          placeholder: "Email ID",
          inputType: "email",
          fieldType: "Inputs",
        },
        {
          key: "Titels",
          label: "Title",
          name: "Titels",
          options: optionsForTitle,
          fieldType: "TitleSelect",
        },
        {
          key: "StudentName",
          label: "Name of The Student",
          name: "StudentName",
          placeholder: "Name of The Student",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Duration",
          label: "Course Duration",
          name: "Duration",
          placeholder: "Course Duration",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Course",
          label: "Name Of The Course",
          name: "Course",
          placeholder: "Name Of The Course",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Date",
          label: "Completion Date",
          name: "Date",
          placeholder: "Completion Date",
          inputType: "date",
          fieldType: "Inputs",
        },
      ],
    },

    pgp: {
      defaultText: `Awarded for completing the PGP program in [Course Name] on [Completion Date]`,
      placeholders: [
        { key: "Course", display: "[Course Name]" },
        { key: "Date", display: "[Completion Date]" },
      ],
      css: `
        .description {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1em;
          text-align: center;
          color: #333;
        }`,
      fields: [
        {
          key: "CertificateNo",
          label: "Certificate Number",
          name: "CertificateNo",
          placeholder: "Certificate Number",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "StudentName",
          label: "Student Name",
          name: "StudentName",
          placeholder: "Student Name",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Course",
          label: "Course",
          name: "Course",
          placeholder: "Course",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Date",
          label: "Completion Date",
          name: "Date",
          placeholder: "Completion Date",
          inputType: "date",
          fieldType: "Inputs",
        },
      ],
    },

    // Add more types like 'internship', 'lor', etc.
  };

  const currentConfig = configMap[type] || configMap["free"];

  const [text, setText] = useState(currentConfig.defaultText);
  const [cssEditorContent, setCssEditorContent] = useState(currentConfig.css);

  const generateCertificateText = () => {
    let result = text;
    currentConfig.placeholders.forEach(({ key, display }) => {
      result = result.replace(
        new RegExp(display, "g"),
        studentFormData[key] || `<${key}>`
      );
    });
    return result;
  };

  return (
    <LandingSingle
      fieldConfigs={currentConfig.fields}
      text={text}
      setText={setText}
      cssEditorContent={cssEditorContent}
      setCssEditorContent={setCssEditorContent}
      generateCertificateText={generateCertificateText}
      placeholders={currentConfig.placeholders}
      studentFormData={studentFormData}
      setStudentFormData={setStudentFormData}
      type={type}
      zoom={zoom}
      position={position}
      isDragging={isDragging}
      handleWheel={handleWheel}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      handleMouseUp={handleMouseUp}
      getTextareaStyle={getTextareaStyle}
      fontFamily={fontFamily}
      setFontFamily={setFontFamily}
      fontStyles={fontStyles}
      setFontStyles={setFontStyles}
      textColor={textColor}
      setTextColor={setTextColor}
      tempSetting={tempSetting}
      handleTempSetting={handleTempSetting}
    />
  );
}
