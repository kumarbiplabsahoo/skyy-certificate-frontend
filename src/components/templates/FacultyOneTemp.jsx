import styles from "./FacultyOne.module.css";
import CertImage from "../../assets/svg/FacultyOne.svg";
import QRCode from "react-qr-code";
import { useRef, useEffect, forwardRef } from "react";

const FacultyOneTemp = forwardRef(
  (
    {
      zoom,
      position,
      isDragging,
      activeCSS,
      certData,
      textTemplate,
      fontFamily,
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      if (isNaN(date)) return "";

      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();

      const suffix =
        day % 10 === 1 && day !== 11
          ? "st"
          : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

      return `${day}${suffix} ${month} ${year}`;
    };

    useEffect(() => {
      if (containerRef.current && overlayRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        overlayRef.current.style.transformOrigin = `${width / 2}px ${
          height / 2
        }px`;
      }
    }, []);

    const currentUrl = window.location.origin;

    const replacedText = textTemplate
      ?.replace(/\[Course Name\]/g, certData?.Course || "<Course Name>")
      .replace(/\[College Name\]/g, certData?.CollegeName || "<College Name>")
      .replace(
        /\[Start Date\]/g,
        formatDate(certData?.StartDate || "<Start Date>")
      )
      .replace(/\[End Date\]/g, formatDate(certData?.EndDate || "<End Date>"));

    const combinedCSS = `
    ${activeCSS}
  `;

    return (
      <div
        ref={containerRef}
        className={styles.container}
        style={{
          overflow: "hidden",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <style>{combinedCSS}</style>

        <div
          ref={overlayRef}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            willChange: "transform",
            transition: "transform 0.1s ease-out",
            position: "relative",
          }}
        >
          <div ref={ref}>
            <img
              src={CertImage}
              alt="Certificate Background"
              className={styles.certificateImage}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                cursor: isDragging ? "grabbing" : "grab",
              }}
            />

            <div className={styles.certNumberBox}>
              <p className={styles.certLabel}>Certificate No:</p>
              <p className={styles.certValue}>
                {certData?.CertificateNo || "XXXXXX"}
              </p>
            </div>

            <div className={styles.collegeImg}>
               {certData?.CollegeImage?.preview ? (
    <img
      className={styles.imgCollage}
      src={certData.CollegeImage.preview}
      alt="College logo"
    />
  ) : null}
            </div>

            <div className={styles.qrCodeBox}>
              <QRCode
                value={`${currentUrl}/qr_valid/${certData?.QrId || "NA"}`}
                size={50}
              />
            </div>

            <div className={styles.studentNameBox}>
              <h1 className={styles.studentName}>
                {certData?.Titels || ""}{" "}
                {certData?.StudentName || "Student Name"}
              </h1>
            </div>

            <div className="text-overlay">
              <div
                className="description"
                style={{ fontFamily }}
                dangerouslySetInnerHTML={{ __html: replacedText }}
              />
            </div>

            <div className={styles.signatureWrapper}>
              <div className={styles.signatureContainer}>
                <div className={styles.signatureImageBox}>
                  <img
                    src={
                      certData?.Signature1?.preview ||
                      "/placeholder-signature.png"
                    }
                    alt="Signature 1"
                    className={styles.signatureImage}
                  />
                </div>
                <div className={styles.signatureDetails}>
                  <p className={styles.signatureTitle}>
                    {certData.Mng_Designation1 || "Program Manager"}
                  </p>
                  <p className={styles.signatureSubtitle}>
                    {certData.Mng_Desg_Add1 || "Skyy Skill"}
                  </p>
                </div>
              </div>

              <div className={styles.signatureContainer}>
                <div className={styles.signatureImageBox}>
                  <img
                    src={
                      certData?.Signature2?.preview ||
                      "/placeholder-signature.png"
                    }
                    alt="Signature 2"
                    className={styles.signatureImage}
                  />
                </div>
                <div className={styles.signatureDetails}>
                  <p className={styles.signatureTitle}>
                    {certData.Mng_Designation2 ||
                      "Asst. Program Manager. Skyy Skill Accademy"}
                  </p>
                  <p className={styles.signatureSubtitle}>
                    {certData.Mng_Desg_Add2 || "Matha Sahi, Tulasipur"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default FacultyOneTemp;
