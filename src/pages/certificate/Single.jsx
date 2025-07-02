import { useCertificateType } from "../../App";
import styles from "./Single.module.css";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import cirt1 from "../../assets/images/cirt1.avif";
// import cirt2 from "../../assets/images/cirt2.jpeg";
import { useState } from "react";

export default function Single() {
  const type = useCertificateType();

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.min(Math.max(0.5, prev + delta), 3));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const optionsForTitle = [
    { label: "Title", value: "" },
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Ms.", value: "Ms." },
    { label: "Miss", value: "Miss" },
  ];
  return (
    <div className={styles.singleCertificate}>
      <h2>Free &gt; Single &gt; Single Certificate - {type}</h2>
      {/* Your single certificate implementation based on type */}
      <div className={styles.topBox}></div>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.formBox}>
            <Input
              type="text"
              className={styles.input}
              placeholder="Certificate Number"
            />
            <Input
              type="email"
              className={styles.input}
              placeholder="Email ID Of The Student"
            />
            <div className={styles.stuName}>
              <Select options={optionsForTitle} className={styles.select} />
              <Input
                type="text"
                className={styles.stuInput}
                placeholder="Name of The Student"
              />
            </div>
            <Input
              type="text"
              className={styles.input}
              placeholder="Course Duration"
            />
            <Input
              type="text"
              className={styles.input}
              placeholder="Name Of The Course"
            />
            <Input type="date" className={styles.input} />
            <Button type="button">Save</Button>
          </div>
        </div>
        <div className={styles.certificate}>
          <div
            className={styles.zoomWrapper}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={cirt1}
              alt="certificate"
              className={styles.cirtImage}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                cursor: isDragging ? "grabbing" : "grab",
              }}
            />
          </div>

          <Button type="button" className={styles.downloadButton}>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
