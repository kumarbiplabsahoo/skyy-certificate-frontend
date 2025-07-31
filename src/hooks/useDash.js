import { useContext } from "react";
import { DashContext } from "../context/dashContext";
import {
  dateFilterCertificates,
  deleteCertificateById,
  deleteMultipleCertificates,
  getAllGenCertificates,
  searchFilterCertificates,
} from "../api/dashService";
import { setAllCerificates, setCerificates } from "../store/dashSlice";
import { startInnerLoad, stopInnerLoad } from "../store/authSlice";
import { useDispatch } from "react-redux";

export const UseDash = () => {
  const {
    totalPages,
    totalRecords,
    setTotalRecords,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    setRecordsPerPage,
    fetchAllCertificates,
  } = useContext(DashContext);
  const dispatch = useDispatch();

  const getAllGenCert = async () => {
    dispatch(startInnerLoad());
    try {
      const response = await getAllGenCertificates();
      const { data, message } = response;
      if (response?.success) {
        dispatch(setAllCerificates(data));
      } else {
        console.error(message || "Bulk delete failed");
      }
    } catch (error) {
      console.error("Error bulk deleting certificates:", error);
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  const searchFilter = async (searchTerm) => {
    dispatch(startInnerLoad());
    try {
      const response = await searchFilterCertificates(
        currentPage,
        recordsPerPage,
        searchTerm
      );
      const { data, message } = response;
      if (response?.success) {
        const { certificates, pagination } = data;
        setTotalRecords(pagination.total);
        dispatch(setCerificates(certificates));
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("batches data couldn't get", error);
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  const dateFilter = async (from, to) => {
    dispatch(startInnerLoad());
    try {
      const response = await dateFilterCertificates(
        from,
        to,
        currentPage,
        recordsPerPage
      );
      const { data, message } = response;
      if (response?.success) {
        const { certificates, allcertificates, pagination } = data;
        setTotalRecords(pagination.total);
        dispatch(setCerificates(certificates));
        dispatch(setAllCerificates(allcertificates));
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("batches data couldn't get", error);
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  const deleteSingleCertificate = async (id) => {
    dispatch(startInnerLoad());
    try {
      const response = await deleteCertificateById(id);
      if (response?.success) {
        fetchAllCertificates();
      } else {
        console.error(response?.message || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  const deleteBulkCertificates = async (ids) => {
    dispatch(startInnerLoad());
    try {
      const response = await deleteMultipleCertificates(ids);
      if (response?.success) {
        fetchAllCertificates();
      } else {
        console.error(response?.message || "Bulk delete failed");
      }
    } catch (error) {
      console.error("Error bulk deleting certificates:", error);
    } finally {
      dispatch(stopInnerLoad());
    }
  };

  return {
    totalPages,
    totalRecords,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    setRecordsPerPage,
    fetchAllCertificates,
    getAllGenCert,
    searchFilter,
    dateFilter,
    deleteSingleCertificate,
    deleteBulkCertificates,
  };
};
