import { useEffect, useState } from "react";
import { UseSingle } from "../../hooks/useSingle";
import LandingSingle from "../../components/singleParts/LandingSingle";
import { useSelector } from "react-redux";
import InlineLoader from "../../components/ui/InlineLoader";

export default function BulkCertificate() {
  const { innerloading } = useSelector((state) => state.auth);
  const { placeholders } = useSelector((state) => state.temp);
  const {
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

  const [generatedText, setGeneratedText] = useState("");

  const [studentFormData, setStudentFormData] = useState({
    QrId: "",
    RegNo: "",
    CertificateNo: "",
    Titels: "",
    Saluation_1: "",
    Saluation_2: "",
    Saluation_3: "",
    Saluation_4: "",
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
  }, [studentFormData.Titels]);

  const configMap = {
    free: {
      fields: [
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          CertificateNo: "SSA-01-2406897657",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          Duration: "2 months",
          Course: "MERN Stack",
          Date: "10th June 2024",
        },
      ],
      fileName: "Free_Course.xlsx",
    },

    asdc: {
      fields: [
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          CertificateNo: "SSA-01-2406897657",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          Duration: "2 months",
          Course: "MERN Stack",
          Date: "10th June 2024",
        },
      ],
      fileName: "ASDC_Certificate.xlsx",
    },

    college: {
      fields: [
        {
          key: "CollegeImage",
          label: "College Image",
          name: "CollegeImage",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
        {
          key: "Signature1",
          label: "First Signature",
          name: "Signature1",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
        {
          key: "Signature2",
          label: "Second Signature",
          name: "Signature2",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          RegNo: "SSA-2406897657",
          CertificateNo: "SSA-01-2406897657",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          Course: "MERN Stack",
          CollegeName: "RNJC College",
          StartDate: "11th June 2024",
          EndDate: "27th June 2024",
          Duration: "16 days",
          Mng_Designation1: "Program Manager",
          Mng_Desg_Add1: "Skyy Skill Academy",
          Mng_Designation2: "Dr B Sreenivasa Reddy",
          Mng_Desg_Add2: "Principal GPREC",
        },
      ],
      fileName: "College_Certificate.xlsx",
    },

    paid: {
      fields: [
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          CertificateNo: "SSA-01-2406897657",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          Duration: "2 months",
          Course: "MERN Stack",
          Date: "10th June 2024",
        },
      ],
      fileName: "Paid_Course_Certificate.xlsx",
    },

    shortterm: {
      fields: [
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          CertificateNo: "SSA-01-2406897657",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          Course: "MERN Stack",
          StartDate: "11th June 2024",
          EndDate: "27th June 2024",
          Duration: "16 days",
        },
      ],
      fileName: "Short_Term_Certificate.xlsx",
    },

    pgp: {
      fields: [
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          RegNo: "SSA-2406897657",
          CertificateNo: "SSA-01-2406897657",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          CourseType: "Master Certification",
          Course: "MERN Stack",
          Duration: "16 days",
          Date: "27th June 2024",
        },
      ],
      fileName: "PGP_Certificate.xlsx",
    },

    lor: {
      fields: [
        {
          key: "Signature1",
          label: "First Signature",
          name: "Signature1",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          CertificateNo: "SSA-01-2406897657",
          Date: "27th June 2024",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          Course: "MERN Stack",
        },
      ],
      fileName: "Letter_of_Recommendation.xlsx",
    },

    internship: {
      fields: [
        {
          key: "Signature1",
          label: "First Signature",
          name: "Signature1",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          Date: "27th June 2024",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          CollegeName: "RNJC College",
          Course: "MERN Stack",
          Duration: "16 days",
        },
      ],
      fileName: "Internship_Certificate.xlsx",
    },

    bonafied: {
      fields: [
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
        {
          key: "Signature1",
          label: "First Signature",
          name: "Signature1",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          CertificateNo: "SSA-01-2406897657",
          Date: "27th June 2024",
          Duration: "16 days",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          CollegeName: "RNJC College",
          Course: "MERN Stack",
          CoursePrice: "109990",
        },
      ],
      fileName: "Bonafied_Certificate.xlsx",
    },

    clearance: {
      fields: [
        {
          key: "xlsx",
          label: "Add xlsx sheet here",
          name: "ExcelSheet",
          fieldType: "FileUpload",
          accept: ".xlsx, .xls, .numbers",
        },
      ],
      xlsxdata: [
        {
          recipientEmail: "kbs.li2n@gmail.com",
          Titels: "Mr / Mrs/ Miss",
          StudentName: "Kumar Biplab",
          Course: "MERN Stack",
          CourseType: "Online",
          CoursePrice: "10,400",
          Collected_Amount: "10,000",
          Outstanding_dues: "400",
        },
      ],
      fileName: "Clearance_Certificate.xlsx",
    },
  };
  const currentConfig = configMap[type] || configMap["free"];

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

  return innerloading ? (
    <InlineLoader />
  ) : (
    <LandingSingle
      fieldConfigs={currentConfig.fields}
      fieldDataxlsx={currentConfig.xlsxdata}
      fieldFileName={currentConfig.fileName}
      text={text}
      setText={setText}
      cssEditorContent={cssEditorContent}
      setCssEditorContent={setCssEditorContent}
      generatedText={generatedText}
      // generateCertificateText={generateCertificateText}
      placeholders={placeholders}
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
