import styles from "./LOR.module.css";
import CertImage from "../../assets/svg/letterHead.png";
import QRCode from "react-qr-code";
import { useRef, useEffect, forwardRef } from "react";

const LORTemp = forwardRef(
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
      // .replace(/\[Completion Date\]/g, formatDate(certData?.Date || "<Completion Date>"))
      .replace(/\[Titels\]/g, certData?.Titels || "<Duration>")
      .replace(/\[Saluation 1\]/g, certData?.Saluation_1 || "<Saluation_1>")
      .replace(/\[Saluation 2\]/g, certData?.Saluation_2 || "<Saluation_2>")
      .replace(/\[Saluation 3\]/g, certData?.Saluation_3 || "<Saluation_3>")
      .replace(/\[Saluation 4\]/g, certData?.Saluation_4 || "<Saluation_4>")
      .replace(/\[Student Name\]/g, certData?.StudentName || "<StudentName>");

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
              <p className={styles.certLabel}>Ref No. :</p>
              <p className={styles.certValue}>
                {certData?.CertificateNo || "XXXXXX"}
              </p>
            </div>
            <div className={styles.dateBox}>
              <p className={styles.certLabel}>date:</p>
              <p className={styles.certValue}>
                {formatDate(certData?.Date) || "<<date>>"}
              </p>
            </div>

            <div className={styles.qrCodeBox}>
              <QRCode
                value={`${currentUrl}/qr_valid/${certData?.QrId || "NA"}`}
                size={50}
              />
            </div>

            <div className="text-overlay">
              <div
                className="description"
                style={{ fontFamily }}
                dangerouslySetInnerHTML={{ __html: replacedText }}
              />
            </div>

            <div className={styles.signatureBlock}>
              <img
                src={
                  certData?.Signature1?.preview || "/placeholder-signature.png"
                }
                alt="Signature 1"
                className={styles.signatureImage}
              />
              <p className={styles.signatureText}>
                Himansu Sekhar Panda
                <br />
                <span>CEO, Skyy Skill Academy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default LORTemp;
