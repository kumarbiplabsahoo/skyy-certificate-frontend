import { useContext, useState } from "react";
import { SingleContext } from "../context/singleContext";

export const UseSingle = () => {
  const {
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
    setTextColor,
  } = useContext(SingleContext);
  const [text, setText] = useState("");
  const [cssEditorContent, setCssEditorContent] = useState(``);

 
  // State for certificate content and styling
  const [isEditing, setIsEditing] = useState(true);
  const [tempSetting, setTempSetting] = useState(false);
  const handleTempSetting = () => {
    setTempSetting(!tempSetting);
  };

  // Get current textarea style
  const getTextareaStyle = () => {
    return {
      fontFamily: fontFamily,
      fontWeight: fontStyles.bold ? "bold" : "normal",
      fontStyle: fontStyles.italic ? "italic" : "normal",
      textDecoration: fontStyles.underline ? "underline" : "none",
      color: textColor,
    };
  };
  
  const optionsForTitle = [
    { label: "Title", value: "" },
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Miss.", value: "Miss." },
  ];

  return {
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
    optionsForTitle,
    getTextareaStyle,
    fontFamily,
    setFontFamily,
    fontStyles,
    setFontStyles,
    textColor,
    setTextColor,
    isEditing,
    setIsEditing,
    tempSetting,
    handleTempSetting
  };
};
