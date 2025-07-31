import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCertificates } from "../api/dashService";
import { setCerificates } from "../store/dashSlice";
import { startInnerLoad, stopInnerLoad } from "../store/authSlice";

export const DashContext = createContext();

export const DashProvider = ({ children }) => {
  const { certificates } = useSelector((state) => state.dash);
  const dispatch = useDispatch();
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const fetchAllCertificates = useCallback(async () => {
    dispatch(startInnerLoad());
    try {
      const response = await getAllCertificates(currentPage, recordsPerPage);
      const { data, message } = response;
      if (response?.success) {
        const { certificates, pagination } = data;
        setTotalRecords(pagination.total);
        dispatch(setCerificates(certificates));
      } else {
        console.error(message);
      }
    } catch (err) {
      console.error("batches data couldn't get", err);
    } finally {
      dispatch(stopInnerLoad());
    }
  }, [currentPage, recordsPerPage, dispatch]);

  // Fetch data when currentPage or recordsPerPage changes
  useEffect(() => {
    fetchAllCertificates();
  }, [currentPage, recordsPerPage, fetchAllCertificates]);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const contextValue = useMemo(
    () => ({
      certificates,
      totalPages,
      totalRecords,
      setTotalRecords,
      currentPage,
      recordsPerPage,
      setCurrentPage,
      setRecordsPerPage,
      fetchAllCertificates,
    }),
    [
      certificates,
      totalPages,
      totalRecords,
      currentPage,
      recordsPerPage,
      fetchAllCertificates,
    ]
  );

  return (
    <DashContext.Provider value={contextValue}>{children}</DashContext.Provider>
  );
};
