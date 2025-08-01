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

export const SingleProvider = ({ children, initialType = "" }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams(); // ✅ only use id from params
  const isEditRoute = location.pathname.startsWith("/edit");
  const [type, setType] = useState(initialType);

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

  // Fetch template for /single/:type and /bulk/:type
  useEffect(() => {
    const fetchTemplate = async () => {
      if (!type) {
        // Skip fetching if type is not ready (common in /edit/:id initially)
        return;
      }

      try {
        const res = await getCertTempByTempName(type);
        if (res?.success && res?.data) {
          dispatch(setTemplate(res.data));
        } else {
          console.warn("Template fetch failed or returned empty.");
        }
      } catch (error) {
        console.error("Error fetching certificate template:", error);
      }
    };

    fetchTemplate();
  }, [type, dispatch]);

  // Fetch certificate for /edit/:id
  useEffect(() => {
    const fetchCertificate = async () => {
      if (isEditRoute && id) {
        dispatch(startInnerLoad());
        try {
          const response = await getSingleCertificateData(id);
          const { data } = response;

          if (response?.success) {
            dispatch(setSingleCertificate(data));
            const parsedType = data?.CertTemplate?.toLowerCase()
              ?.replace("course", "")
              ?.trim();
            if (parsedType) setType(parsedType);
          } else {
            console.error(response?.message);
          }
        } catch (error) {
          console.error("Failed to fetch certificate:", error);
        } finally {
          dispatch(stopInnerLoad());
        }
      }
    };

    fetchCertificate();
  }, [id, isEditRoute, dispatch]);

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
