import { useEffect, useState } from "react";
import { UseSingle } from "../../hooks/useSingle";
import LandingSingle from "../../components/singleParts/LandingSingle";

export default function SingleCertficate() {
  const {
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

    asdc: {
      defaultText: `For Participating and Completing [Duration] Free Certified Program on "[Course Name]" Conducted on [Completion Date], in association with
Automotive Skills Development Council (ASDC)`,
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
            top: 54%;
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

    college: {
      defaultText: `has successfully completed the summer internship program on [Course Name] conducted by [College Name] in association with Skyy Skill Academy From [Start Date] to [End Date]`,
      placeholders: [
        { key: "Course", display: "[Course Name]" },
        { key: "CollegeName", display: "[College Name]" },
        { key: "StartDate", display: "[Start Date]" },
        { key: "EndDate", display: "[End Date]" },
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
            top: 60%;
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
      defaultText: `For Participating & Completing [Duration] Certified Program on "[Course Name]" Conducted on [Completion Date]`,
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
            top: 60%;
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

    shortterm: {
      defaultText: `has successfully completed the [Duration] Summer Internship Program on "[Course Name]", held from [Start Date] to [End Date].`,
      placeholders: [
        { key: "Course", display: "[Course Name]" },
        { key: "Duration", display: "[Duration]" },
        { key: "StartDate", display: "[Start Date]" },
        { key: "EndDate", display: "[End Date]" },
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
            top: 60%;
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
      defaultText: `<div class="line5">Registration No. [Reg No]</div>
<div class="line1">Has Successfully Completed the [Duration] Program &</div>
<div class="line2">Awarded with</div>
<div class="separator"></div>
<div class="line3">Post Graduation Program on</div>
<div class="line4">[Course Name]</div>
<div class="line5">[Completion Date]</div>
<div class="line6">Certificate No. [Certificate No]</div>`,
      placeholders: [
        { key: "Course", display: "[Course Name]" },
        { key: "Date", display: "[Completion Date]" },
        { key: "Duration", display: "[Duration]" },
        { key: "CertificateNo", display: "[Certificate No]" },
        { key: "RegNo", display: "[Reg No]" },
      ],
      css: `
.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.description {
  width: 80%;
  margin: 100px auto 0 auto; /* 40px top margin */
  font-family: 'Segoe UI', sans-serif;
  color: #3a4d66;
  line-height: 1.5;
}

.line1,
.line2,
.line3,
.line4,
.line5,
.line6 {
  margin: 8px 0;
  min-height: 1.5em; /* keeps height consistent even if text is short */
  word-break: break-word;
}

.line1 {
  font-size: 20px;
  font-weight: 500;
  color: #506580;
}

.line2 {
  font-size: 20px;
  font-weight: 500;
  color: #506580;
}

.separator {
  margin: 12px auto;
  width: 30%;
  height: 2px;
  background-color: #e0c800;
}

.line3 {
  font-size: 20px;
  font-weight: 500;
  color: #d1b400;
}

.line4 {
  font-size: 25px;
  font-weight: 500;
  color: #d1b400;
}

.line5 {
  font-size: 18px;
  font-weight: 500;
  color: #506580;
}
.line6 {
  font-size: 18px;
  font-weight: 500;
  color: #506580;
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
      defaultText: `  
  <div class="reference-letter">
  <h2 class="title">TO WHOM IT MAY CONCERN</h2>
  <p class="content">
  This letter of Reference is for [Titels] [Student Name] has successfully completed Advanced Certification Program on "[Course Name]" under Skyy Skill Academy.
  [Saluation 4] performed very well in the entire assessments test taken during the training and was dedicated towards learning. 
  Through this training [Saluation 1] has attained good technical knowledge and completed his assignment with good grades. 
  [Saluation 4] is a keen learner & a competent Professional. During the tenure as learner, we found his efforts sincere, meticulous & result oriented. 
  We highly recommend [Saluation 3] for [Saluation 2] applied position at your organization without reservation.
  </p>
  <p class="bottomcontent"> 
  We delighted to give [Saluation 3] strong positive recommendation.
  </p>
  </div>`,
      placeholders: [
        { key: "Titels", display: "[Titels]" },
        { key: "Saluation_1", display: "[Saluation 1]" },
        { key: "Saluation_2", display: "[Saluation 2]" },
        { key: "Saluation_3", display: "[Saluation 3]" },
        { key: "Saluation_4", display: "[Saluation 4]" },
        { key: "StudentName", display: "[Student Name]" },
        { key: "Course", display: "[Course Name]" },
      ],
      css: `
.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
}
.description {
  width: 88%;
  margin: 30% auto 0 auto; /* 40px top margin */
  font-family: 'Segoe UI', sans-serif;
  color: #3a4d66;
  line-height: 1.5;
}

.reference-letter {
  margin: 10px auto 0;
  font-family: 'Segoe UI', sans-serif;
  color: #000000;
  line-height: 1.8;
}

.title {
  text-align: center;
  font-size: 1.1vw;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 1.5px solid #000;
  display: inline-block;
  padding-bottom: 4px;
  margin-bottom: 28px;
}

.content {
  font-size: 0.8vw;
  text-align: justify;
  margin-bottom: 0;
  font-weight: bold;
}

.content strong {
  font-weight: 600;
}
.bottomcontent{
  margin-top: 10%;
  font-size: 0.8vw;
  text-align: justify;
  font-weight: bold;
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
      defaultText: `  
  <div class="reference-letter">
  <h2 class="title">TO WHOMSOEVER IT MAY CONCERN</h2>
  <p class="content">
  This is to certify that [Titels] [Student Name] of [College Name]. 
  [Saluation 4] has successfully completed [Saluation 2] internship cum training on [Course Name] for duration of [Duration] at Skyy Skill Academy.
  </p>
  <p class="content">
  During this internship period, [Titels] [Student Name] has participated in multiple major & minor Projects on [Course Name] & has achieved grade-o.
  </p>
  <p class="content">
  [Titels] [Student Name] displayed professional traits during [Saluation 2] internship period and managed to complete all assigned tasks as instructed. 
  [Saluation 4] was hardworking, dedicated, and committed. It was a pleasure having [Saluation 2] with us in this short period.
  </p>
  <p class="content">
  We highly recommend [Titels] [Student Name] for the applied position at your organization without reservation.
  </p>
  </div>`,
      placeholders: [
        { key: "Titels", display: "[Titels]" },
        { key: "Saluation_1", display: "[Saluation 1]" },
        { key: "Saluation_2", display: "[Saluation 2]" },
        { key: "Saluation_3", display: "[Saluation 3]" },
        { key: "Saluation_4", display: "[Saluation 4]" },
        { key: "StudentName", display: "[Student Name]" },
        { key: "Course", display: "[Course Name]" },
        { key: "CollegeName", display: "[College Name]" },
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
}
.description {
  width: 88%;
  margin: 25% auto 0 auto; /* 40px top margin */
  font-family: 'Segoe UI', sans-serif;
  color: #3a4d66;
  line-height: 1.5;
}

.reference-letter {
  margin: 10px auto 0;
  font-family: 'Segoe UI', sans-serif;
  color: #000000;
  line-height: 1.8;
}

.title {
  text-align: center;
  font-size: 1.1vw;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 1.5px solid #000;
  display: inline-block;
  padding-bottom: 4px;
  margin-bottom: 5%;
}

.content {
  font-size: 0.8vw;
  text-align: justify;
  margin-bottom: 3%;
  font-weight: bold;
}

.content strong {
  font-weight: 600;
}`,
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
      defaultText: `  
<div class="reference-container">
  <div class="reference-title">TO WHOM IT MAY CONCERN</div>
        
  <div class="reference-paragraph">
    This is to certify that <span class="reference-strong">[Titels] [Student Name]</span>, a bona fide student of <span class="reference-strong">[College Name]</span>, 
    is enrolled in the <span class="reference-strong">[Course Name]</span> at our esteemed institution <span class="reference-strong">[College Name]</span>.
  </div>

  <div class="course-details">
    <u><b>Details of the course:</b></u>
    <p>Course Name: [Course Name]</p>
    <p>Duration: [Duration]</p>
    <p>Institution Name: [College Name]</p>
    <p>Course Price: Rs.[Course Price]</p>
  </div>

  <div class="reference-paragraph">
  <span class="reference-strong">[Titels] [Student Name]</span> has been admitted to this program and will be pursuing their studies diligently. 
  As per our records, they are a registered student in good standing and have met all the necessary requirements for enrollment in the aforementioned course.
  </div>

  <div class="reference-paragraph">
   The course focuses on advanced training in Finite Element Analysis (FEA) and Structural Engineering, 
   tailored for professionals in the mechanical and oil & gas sectors. Key learning areas include:
  </div>

    <div class="course-details">
      <ul class="content-list">
          <li class="content-listItem">
           Foundation analysis accounting for wind, snow, seismic
           forces, transport, and dead loads.
          </li>
          <li class="content-listItem">
           Load analysis on pressure vessel nozzles and mechanical machinery.
          </li>
          <li class="content-listItem">
           Lifting and blasting (impact) analysis.
          </li>
          <li class="content-listItem">
           Structural validation of mechanical devices such as lifting systems on pressure vessels and DAVIT mechanisms.
          </li>
    </div>

  <div class="reference-paragraph">
   Should you require any further clarification or information, please feel free to contact us at the provided contact details below.
  </div>

  <div class="reference-paragraph">
   We are delighted to give them a strong positive recommendation.
  </div>
</div>`,
      placeholders: [
        { key: "Titels", display: "[Titels]" },
        { key: "StudentName", display: "[Student Name]" },
        { key: "Course", display: "[Course Name]" },
        { key: "CoursePrice", display: "[Course Price]" },
        { key: "Duration", display: "[Duration]" },
        { key: "CollegeName", display: "[College Name]" },
      ],
      css: `
.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.description {
  width: 88%;
  margin: 25% auto 0 auto; /* 40px top margin */
  font-family: 'Segoe UI', sans-serif;
  color: #3a4d66;
  line-height: 1.5;
}

.reference-container {
  text-align: center;
  margin: 5px auto 0;
  font-family: 'Segoe UI', sans-serif;
  color: #000000;
  line-height: 1.8;
}

.reference-title {
  font-size: 0.9vw;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 1.5px solid #000;
  display: inline-block;
  padding-bottom: 4px;
  margin-bottom: 1%;
}

.reference-paragraph {
  text-align: justify;
  font-size: 0.7vw;
  margin: 10px 0;
  padding: 0;
}

.reference-strong {
  font-weight: bold;
}

.course-details {
  font-size: 0.7vw;
  margin-top: 2%;
  text-align: left;
  margin-left: 2%;
} 
.content-list{
  margin: 10px 10px;
  list-style-type: disc;
}
.content-listItem{
   margin: 0px 0;
}       
 
`,
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
      defaultText: `  
  <div class="reference-letter">
  <h2 class="title">CLEARANCE FORM</h2>
  <div class="content">
  <p class="letter">Name: [Student Name]</p>
  <p class="letter">Course Name: [Course Name]</p>
  <p class="letter">Mode: [Mode of Pay]</p>
  <p class="letter">Total Course Fees(₹): [Course Price]</p>
  <p class="letter">Collected Amount(₹): [Collected Amount]</p>
  <p class="letter">Outstanding Dues(₹): [Outstanding Dues]</p>
  </div>
  </div>`,
      placeholders: [
        { key: "StudentName", display: "[Student Name]" },
        { key: "Course", display: "[Course Name]" },
        { key: "Mode", display: "[Mode of Pay]" },
        { key: "CoursePrice", display: "[Course Price]" },
        { key: "Collected_Amount", display: "[Collected Amount]" },
        { key: "Outstanding_dues", display: "[Outstanding Dues]" },
      ],
      css: `
.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
}
.description {
  width: 88%;
  margin: 25% auto 0 auto; /* 40px top margin */
  font-family: 'Segoe UI', sans-serif;
  color: #3a4d66;
  line-height: 1.5;
}
.reference-letter {
  margin: 10px auto 0;
  font-family: 'Segoe UI', sans-serif;
  color: #000000;
  line-height: 1.8;
}
.title {
  text-align: center;
  font-size: 1.6vw;
  font-weight: bold;
  color: #507ae1;
  text-transform: uppercase;
  display: inline-block;
  padding-bottom: 4px;
  margin-bottom: 28px;
}
.content {
  width: 100%;
  margin: 4%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem
}
.letter{
  font-size: 0.9vw;
  font-weight: 600;
  text-align: left;
  margin: 0;
  padding: 0;
}`,
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

  useEffect(() => {
    setText(currentConfig.defaultText);
    setCssEditorContent(currentConfig.css);
  }, [type, currentConfig]);

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
