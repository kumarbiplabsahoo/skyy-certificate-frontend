import { useEffect, useState } from "react";
import { UseSingle } from "../../hooks/useSingle";
import LandingSingle from "../../components/singleParts/LandingSingle";
import { useSelector } from "react-redux";
import InlineLoader from "../../components/ui/InlineLoader";

export default function SingleCertficate() {
  const { innerloading } = useSelector((state) => state.auth);
  const { placeholders } = useSelector((state) => state.temp);
  const {
    text,
    setText,
    cssEditorContent,
    setCssEditorContent,
    type,
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

  const [generatedText, setGeneratedText] = useState("");

  const [studentFormData, setStudentFormData] = useState({
    _id: "",
    CertTemplate: "",
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
        CertTemplate: type,
        Saluation_1: salutation_1,
        Saluation_2: salutation_2,
        Saluation_3: salutation_3,
        Saluation_4: salutation_4,
      }));
    }
  }, [studentFormData.Titels, type]);

  const configMap = {
    free: {
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

    asdc: {
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

    college: {
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
          label: "Department Name",
          name: "Duration",
          placeholder: "Department Name",
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
          key: "CollegeName",
          label: "College Name",
          name: "CollegeName",
          placeholder: "College Name",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "StartDate",
          label: "Start Date",
          name: "StartDate",
          placeholder: "Start Date",
          inputType: "date",
          fieldType: "Inputs",
        },
        {
          key: "EndDate",
          label: "End Date",
          name: "EndDate",
          placeholder: "End Date",
          inputType: "date",
          fieldType: "Inputs",
        },
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
          key: "Mng_Designation1",
          label: "First Mng Designation",
          name: "Mng_Designation1",
          placeholder: "First Mng Designation",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Mng_Desg_Add1",
          label: "First Mng Address",
          name: "Mng_Desg_Add1",
          placeholder: "First Mng Address",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Signature2",
          label: "Second Signature",
          name: "Signature2",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
        {
          key: "Mng_Designation2",
          label: "Second Mng Designation",
          name: "Mng_Designation2",
          placeholder: "Second Mng Designation",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Mng_Desg_Add2",
          label: "Second Mng Address",
          name: "Mng_Desg_Add2",
          placeholder: "Second Mng Address",
          inputType: "text",
          fieldType: "Inputs",
        },
      ],
    },

    paid: {
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

    shortterm: {
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
          key: "StartDate",
          label: "Start Date",
          name: "StartDate",
          placeholder: "Start Date",
          inputType: "date",
          fieldType: "Inputs",
        },
        {
          key: "EndDate",
          label: "End Date",
          name: "EndDate",
          placeholder: "End Date",
          inputType: "date",
          fieldType: "Inputs",
        },
      ],
    },

    pgp: {
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
          key: "RegNo",
          label: "Registration Number",
          name: "RegNo",
          placeholder: "Registration Number",
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

    lor: {
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
        {
          key: "Signature1",
          label: "First Signature",
          name: "Signature1",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
      ],
    },

    internship: {
      fields: [
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
          key: "CollegeName",
          label: "College Name",
          name: "CollegeName",
          placeholder: "College Name",
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
          key: "Duration",
          label: "Course Duration",
          name: "Duration",
          placeholder: "Course Duration",
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
        {
          key: "Signature1",
          label: "First Signature",
          name: "Signature1",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
      ],
    },

    bonafied: {
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
          key: "Course",
          label: "Name Of The Course",
          name: "Course",
          placeholder: "Name Of The Course",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "CoursePrice",
          label: "Course Price",
          name: "CoursePrice",
          placeholder: "Course Price",
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
          key: "CollegeName",
          label: "College Name",
          name: "CollegeName",
          placeholder: "College Name",
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
        {
          key: "Signature1",
          label: "First Signature",
          name: "Signature1",
          fieldType: "ImageUpload",
          accept: "image/*",
        },
      ],
    },

    clearance: {
      fields: [
        {
          key: "recipientEmail",
          label: "Email ID",
          name: "recipientEmail",
          placeholder: "Email ID",
          inputType: "email",
          fieldType: "Inputs",
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
          key: "Course",
          label: "Name Of The Course",
          name: "Course",
          placeholder: "Name Of The Course",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Mode",
          label: "Mode Of Payment",
          name: "Mode",
          placeholder: "Mode Of Payment",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "CoursePrice",
          label: "Course Price",
          name: "CoursePrice",
          placeholder: "Course Price",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Collected_Amount",
          label: "Collected Amount",
          name: "Collected_Amount",
          placeholder: "Collected Amount",
          inputType: "text",
          fieldType: "Inputs",
        },
        {
          key: "Outstanding_dues",
          label: "Outstanding Dues",
          name: "Outstanding_dues",
          placeholder: "Outstanding Dues",
          inputType: "text",
          fieldType: "Inputs",
        },
      ],
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

  // const handleSave = async () => {
  //   dispatch(startInnerLoad());
  //   try {
  //     if (certificateRef.current) {
  //       const cleanedPlaceholders = placeholders.map(({ key, display }) => ({
  //         key,
  //         display,
  //       }));
  //       let certificateDetails;

  //       certificateDetails = {
  //         ...studentFormData,
  //         placeholders: cleanedPlaceholders,
  //         textFormat: generatedText,
  //         styleFormat: cssEditorContent,
  //       };

  //       await CreateNewCertificate(certificateDetails).then((data) => {
  //         setStudentFormData((prev) => ({
  //           ...prev,
  //           QrId: data._id,
  //         }));
  //         certificateDetails = {
  //           ...studentFormData,
  //           QrId: data._id,
  //         };
  //       });

  //       await new Promise((resolve) => setTimeout(resolve, 100));
  //       // Defensive check for ref
  //       const canvas = await html2canvas(certificateRef.current, {
  //         scale: 8,
  //         logging: false,
  //         dpi: 800,
  //       });
  //       const canvasWidth = canvas.width;
  //       const canvasHeight = canvas.height;
  //       const imgData = canvas.toDataURL("image/jpeg", 1.0);

  //       const pdf = new jsPDF({
  //         orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
  //         unit: "pt",
  //         format: [canvasWidth, canvasHeight],
  //       });

  //       pdf.addImage(imgData, "JPEG", 0, 0, canvasWidth, canvasHeight);

  //       const fileName = studentFormData.CertificateNo
  //         ? `${studentFormData.CertificateNo}.pdf`
  //         : `${type || "certificate"}_${Date.now()}.pdf`;

  //       pdf.save(fileName);

  //       const pdfBlob = pdf.output("blob");
  //       const formData = new FormData();
  //       formData.append("document", pdfBlob, fileName);
  //       formData.append("certId", certificateDetails.QrId);
  //       formData.append("email", studentFormData?.recipientEmail || "");
  //       formData.append("Titels", studentFormData?.Titels || "");
  //       formData.append("StudentName", studentFormData?.StudentName || "");
  //       formData.append("Course", studentFormData?.Course || "");

  //       if (type === "clearance") {
  //         await sendMailCertClearance(formData);
  //       } else {
  //         await sendMailWithCertificate(formData);
  //       }

  //       alert("Certificate saved and sent successfully!");
  //       // Reload the window
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error saving certificate:", error);
  //     alert(
  //       "Failed to save certificate. Please check the console for details."
  //     );
  //   } finally {
  //     dispatch(stopInnerLoad());
  //   }
  // };

  return innerloading ? (
    <InlineLoader />
  ) : (
    <LandingSingle
      fieldConfigs={currentConfig.fields}
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
