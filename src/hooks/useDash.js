import { useContext } from "react";
import { DashContext } from "../context/dashContext";

export const UseDash = () => {
  const {
    totalPages,
    totalRecords,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    setRecordsPerPage,
  } = useContext(DashContext);
  
  return {
    totalPages,
    totalRecords,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    setRecordsPerPage,
  };
};
