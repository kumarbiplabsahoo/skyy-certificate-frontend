import styles from "./Clearance.module.css";
import CertImage from "../../assets/svg/Clearance.png";
import { useRef, useEffect, forwardRef } from "react";

const ClearanceTemp = forwardRef(
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

    useEffect(() => {
      if (containerRef.current && overlayRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        overlayRef.current.style.transformOrigin = `${width / 2}px ${
          height / 2
        }px`;
      }
    }, []);

    const replacedText = textTemplate
      ?.replace(/\[Course Name\]/g, certData?.Course || "<Course Name>")
      .replace(/\[Student Name\]/g, certData?.StudentName || "<StudentName>")
      .replace(/\[Mode of Pay\]/g, certData?.Mode || "<Mode>")
      .replace(/\[Course Price\]/g, certData?.CoursePrice || "<CoursePrice>")
      .replace(
        /\[Collected Amount\]/g,
        certData?.Collected_Amount || "<CollectedAmount>"
      )
      .replace(
        /\[Outstanding Dues\]/g,
        certData?.Outstanding_dues || "<Outstanding_dues>"
      );

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

          <div className="text-overlay">
            <div
              className="description"
              style={{ fontFamily }}
              dangerouslySetInnerHTML={{ __html: replacedText }}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default ClearanceTemp;
