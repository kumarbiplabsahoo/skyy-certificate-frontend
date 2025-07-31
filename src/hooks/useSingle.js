import { useContext, useEffect, useState } from "react";
import { SingleContext } from "../context/singleContext";
import { useDispatch, useSelector } from "react-redux";
import { startInnerLoad, stopInnerLoad } from "../store/authSlice";
import {
  createNewSingleCert,
  updateStyleCertificateTemp,
  updateTextCertificateTemp,
} from "../api/certificateService";
import { setTemplate } from "../store/tempSlice";

export const UseSingle = () => {
  const { defaultText, css } = useSelector((state) => state.temp);
  const dispatch = useDispatch();
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
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    if (type) {
      setText(defaultText || "");
      setCssEditorContent(css || "");
    }
  }, [type, defaultText, css]);

  const CreateNewCertificate = async (certdate) => {
    dispatch(startInnerLoad());
    try {
      const response = await createNewSingleCert(certdate);
      console.log("📦 API Response:", response);
      const { data, message } = response;
      if (response?.success) {
        return data;
      } else {
        console.error("❌ API returned failure:", message);
      }
    } catch (error) {
      console.error("💥 Error in CreateNewCertificate:", error);
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  const UpdateTextTemp = async (updatedText) => {
    dispatch(startInnerLoad());
    try {
      const obj = {
        tempName: type,
        textFormat: updatedText,
      };
      const response = await updateTextCertificateTemp(obj);
      const { data, message } = response;
      if (response?.success) {
        dispatch(setTemplate(data));
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("batches data couldn't get", error);
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  const UpdateStyleTemp = async (updatedStyle) => {
    dispatch(startInnerLoad());
    try {
      const obj = {
        tempName: type,
        styleFormat: updatedStyle,
      };
      const response = await updateStyleCertificateTemp(obj);
      const { data, message } = response;
      if (response?.success) {
        dispatch(setTemplate(data));
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("batches data couldn't get", error);
    } finally {
      dispatch(stopInnerLoad());
    }
  };

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
    handleTempSetting,
    CreateNewCertificate,
    UpdateTextTemp,
    UpdateStyleTemp,
  };
};
