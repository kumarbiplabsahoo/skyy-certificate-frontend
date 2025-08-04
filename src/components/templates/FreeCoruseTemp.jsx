import { useRef, useEffect, forwardRef } from "react";
import styles from "./FreeCource.module.css";
import CertImage from "../../assets/svg/Free Course.svg";
import QRCode from "react-qr-code";

const FreeCourceTemp = forwardRef(
  (
    {
      zoom,
      position,
      isDragging,
      activeCSS,
      certData,
      textTemplate,
      fontFamily
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
      if (containerRef.current && overlayRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        overlayRef.current.style.transformOrigin = `${width / 2}px ${
          height / 2
        }px`;
      }
    }, []);

    const currentUrl = window.location.origin;

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

    const replacedText = textTemplate
      ?.replace(/\[Course Name\]/g, certData?.Course || "<Course Name>")
      .replace(
        /\[Completion Date\]/g,
        formatDate(certData?.Date || "<Completion Date>")
      )
      .replace(/\[Duration\]/g, certData?.Duration || "<Duration>");

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
        <style>{activeCSS}</style>

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

            <div className={styles.qrCodeBox}>
              <QRCode
                value={`${currentUrl}/qr_valid/${certData?.CertificateNo || "NA"}`}
                size={50}
              />
            </div>

            <div className={styles.studentNameBox}>
              <h1 className={styles.studentName}>
                {certData?.Titels || ""} {certData?.StudentName || "Student Name"}
              </h1>
            </div>

            <div className="text-overlay">
              <div
                className="description"
                style={{ fontFamily }}
                dangerouslySetInnerHTML={{ __html: replacedText }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default FreeCourceTemp;
