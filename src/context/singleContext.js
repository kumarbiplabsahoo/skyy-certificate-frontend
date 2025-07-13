import { createContext, useState } from "react";
import { useCertificateType } from "../App";

export const SingleContext = createContext();

export const SingleProvider = ({ children }) => {
  const type = useCertificateType();
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontStyles, setFontStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const [textColor, setTextColor] = useState("#000000");

  const handleWheel = (e) => {
    // e.preventDefault();
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

  return (
    <SingleContext.Provider
      value={{
        type,
        zoom,
        position,
        isDragging,
        handleWheel,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        fontFamily,
        setFontFamily,
        fontStyles,
        setFontStyles,
        textColor,
        setTextColor
      }}
    >
      {children}
    </SingleContext.Provider>
  );
};
