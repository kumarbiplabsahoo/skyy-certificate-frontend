import { createContext, useEffect, useState } from "react";
import { useCertificateType } from "../App";
import { getCertTempByTempName, getSingleCertificateData } from "../api/certificateService";
import { setTemplate } from "../store/tempSlice";
import { useDispatch } from "react-redux";
import { setSingleCertificate } from "../store/dashSlice";
import { startInnerLoad, stopInnerLoad } from "../store/authSlice";

export const SingleContext = createContext();

export const SingleProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { type, id } = useCertificateType();
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

  useEffect(() => {
    const fetchTemplate = async () => {
      if (type) {
        const res = await getCertTempByTempName(type);
        if (res?.success && res?.data) {
          dispatch(setTemplate(res.data));
        }
      } else {
        console.warn("No template type provided in the URL.");
        // Optionally reset state or handle empty case
        dispatch(
          setTemplate({
            tempName: "",
            placeholders: [],
            textFormat: "",
            styleFormat: "",
          })
        );
      }
    };

    fetchTemplate();
  }, [type, dispatch]);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (id) {
        dispatch(startInnerLoad());
        try {
          const response = await getSingleCertificateData(id);
          const { data, message } = response;
          if (response?.success) {
            dispatch(setSingleCertificate(data));
          } else {
            console.error(message);
          }
        } catch (error) {
          console.error("Failed to fetch certificate:", error);
        } finally {
          dispatch(stopInnerLoad());
        }
      }
    };

    fetchCertificate();
  }, [id, dispatch]);

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
        setTextColor,
      }}
    >
      {children}
    </SingleContext.Provider>
  );
};
