import { createContext, useEffect, useRef, useState } from "react";
import {
  getCertTempByTempName,
  getSingleCertificateData,
} from "../api/certificateService";
import { setTemplate } from "../store/tempSlice";
import { useDispatch } from "react-redux";
import { setSingleCertificate } from "../store/dashSlice";
import { startInnerLoad, stopInnerLoad } from "../store/authSlice";
import { useLocation, useParams } from "react-router-dom";

export const SingleContext = createContext();

export const SingleProvider = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { type: routeType, id } = useParams();
  const isEditMode = location.pathname.startsWith("/edit");

  const [type, setType] = useState("");

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const certificateRef = useRef(null);
  const currentProgress = useRef(0);
  const [resolveCapture, setResolveCapture] = useState(null);
  const [isRendering, setIsRendering] = useState(false);
  const [progressModal, setProgressModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [studentCertificates, setStudentCertificates] = useState([]);

  const [studentFormData, setStudentFormData] = useState({
    _id: "",
    CertTemplate: "",
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
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontStyles, setFontStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const [textColor, setTextColor] = useState("#000000");

  const handleWheel = (e) => {
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
    const fetchData = async () => {
      if (isEditMode && id) {
        // Edit Mode: Fetch certificate and derive template
        dispatch(startInnerLoad());
        try {
          const response = await getSingleCertificateData(id);
          const data = response?.data;

          if (response.success && data) {
            dispatch(setSingleCertificate(data));
            setStudentFormData(data);

            const parsedType = data?.CertTemplate?.toLowerCase()
              ?.replace("course", "")
              ?.trim();

            if (parsedType) {
              setType(parsedType);
              const templateRes = await getCertTempByTempName(parsedType);
              if (templateRes?.success && templateRes?.data) {
                dispatch(setTemplate(templateRes.data));
              } else {
                console.warn("No template found for parsed type:", parsedType);
              }
            } else {
              console.warn("Parsed type from CertTemplate is empty.");
            }
          } else {
            console.error("Failed to fetch certificate:", response?.message);
          }
        } catch (err) {
          console.error("Error in edit mode fetch:", err);
        } finally {
          dispatch(stopInnerLoad());
        }
      } else if (routeType) {
        // Single or Bulk mode: fetch by routeType
        setType(routeType);
        try {
          const res = await getCertTempByTempName(routeType);
          if (res?.success && res?.data) {
            dispatch(setTemplate(res.data));
          } else {
            console.warn("No template found for route type:", routeType);
          }
        } catch (err) {
          console.error("Error fetching template for type:", routeType, err);
        }
      }
    };

    fetchData();
  }, [routeType, id, isEditMode, dispatch]);

  return (
    <SingleContext.Provider
      value={{
        studentCertificates,
        setStudentCertificates,
        studentFormData,
        setStudentFormData,
        certificateRef,
        currentProgress,
        resolveCapture,
        setResolveCapture,
        isRendering,
        setIsRendering,
        progressModal,
        setProgressModal,
        progress,
        setProgress,
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
