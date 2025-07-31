import TopFilter from "../../components/dashboard/TopFilter";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { FiEdit, FiTrash } from "react-icons/fi";
import styles from "./style.module.css";
import { Button } from "../../components/ui/Button";
import { Pagination } from "../../components/ui/Pagination";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UseDash } from "../../hooks/useDash";
import InlineLoader from "../../components/ui/InlineLoader";
import { useNavigate } from "react-router-dom";
import { exportToPDF } from "../../utils/ExportPDF";
import { exportToExcel } from "../../utils/ExportExcel";
import { exportToCSV } from "../../utils/ExportCSV";
import Modal from "../../components/ui/Modal";

export default function Dashboard() {
  const { certificates, allcertificates } = useSelector((state) => state.dash);
  const { innerloading } = useSelector((state) => state.auth);
  const {
    totalPages,
    totalRecords,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    getAllGenCert,
    deleteSingleCertificate,
    deleteBulkCertificates,
    // setRecordsPerPage,
  } = UseDash();
  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);

  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentPageIds = certificates.map((item) => item._id);
    if (isAllSelected) {
      setSelectedItems((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    } else {
      setSelectedItems((prev) => [...new Set([...prev, ...currentPageIds])]);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    await deleteBulkCertificates(selectedItems);
    setSelectedItems([]);
    setIsAllSelected(false);
    setDeleteModal(false);
  };

  const excludedFields = [
    "_id",
    "createdAt",
    "updatedAt",
    "__v",
    "CollegeImage",
    "Signature1",
    "Signature2",
    "Signature3",
    "Signature4",
    "textFormat",
    "styleFormat",
    "placeholders",
    "otp",
    "Mng_Designation1",
    "Mng_Desg_Add1",
    "Mng_Designation2",
    "Mng_Desg_Add2",
    "Mng_Designation3",
    "Mng_Desg_Add3",
    "Mng_Designation4",
    "Mng_Desg_Add4",
    "Titels",
    "Saluation_1",
    "Saluation_2",
    "Saluation_3",
    "Student_Designation",
    "StudentValidate",
    "CourseType",
    "Mode",
  ];

  const handleDeleteSingleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmSingleDelete = async () => {
    if (deleteId) {
      await deleteSingleCertificate(deleteId);
      setDeleteId(null);
      setDeleteModal(false);
    }
  };

  const handleDownload = async (type = "pdf", useAll = false) => {
    let dataToExport = certificates;

    if (useAll) {
      if (!allcertificates || allcertificates.length === 0) {
        await getAllGenCert(); // 🔁 This will store into redux
      }
      dataToExport = allcertificates;
    }

    switch (type) {
      case "pdf":
        exportToPDF(dataToExport, "certificates", excludedFields);
        break;
      case "xlsx":
        exportToExcel(dataToExport, "certificates", excludedFields);
        break;
      case "csv":
        exportToCSV(dataToExport, "certificates", excludedFields);
        break;
      default:
        return null;
    }
  };
  return (
    <div className={styles.container}>
      <TopFilter
        onExportPDF={() => handleDownload("pdf", true)} // Download all as PDF
        onExportXLSX={() => handleDownload("xlsx", true)} // Download all as Excel
        onExportCSV={() => handleDownload("csv", true)} // Download all as CSV
        onBulkDelete={() => setDeleteModal(true)} // Trigger modal for bulk delete
        selectedCount={selectedItems.length}
      />

      {innerloading ? (
        <InlineLoader />
      ) : (
        <>
          <div className={styles.tableContainer}>
            <Table>
              <Thead>
                <Tr>
                  <Th>
                    <input
                      id="check"
                      type="checkbox"
                      onChange={handleSelectAll}
                      className={styles.checkbox}
                      checked={
                        certificates.length > 0 &&
                        certificates.every((c) => selectedItems.includes(c._id))
                      }
                    />
                  </Th>
                  <Th>Sl.No</Th>
                  <Th>Types</Th>
                  <Th>Email Id</Th>
                  <Th>Student Name</Th>
                  <Th>Duration</Th>
                  <Th>Course</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {certificates.length > 0 ? (
                  certificates.map((certificate, index) => (
                    <Tr key={certificate._id}>
                      <Td>
                        <input
                          id={`check-${index}`}
                          type="checkbox"
                          checked={selectedItems.includes(certificate._id)}
                          onChange={() => handleSelect(certificate._id)}
                          className={styles.checkbox}
                        />
                      </Td>
                      <Td>{index + 1}</Td>
                      <Td>{certificate.CertTemplate}</Td>
                      <Td>{certificate.recipientEmail}</Td>
                      <Td>{certificate.StudentName}</Td>
                      <Td>{certificate.Duration}</Td>
                      <Td>{certificate.Course}</Td>
                      <Td>
                        {" "}
                        {new Date(certificate.createdAt).toLocaleString()}
                      </Td>
                      <Td>
                        <div className={styles.actions}>
                          {/* <Button
                        variant="success"
                        icon={<FiEye className={styles.icon} />}
                      /> */}
                          <Button
                            variant="info"
                            icon={<FiEdit className={styles.icon} />}
                            onClick={() => navigate(`/edit/${certificate._id}`)}
                          />
                          <Button
                            variant="danger"
                            icon={<FiTrash className={styles.icon} />}
                            onClick={() =>
                              handleDeleteSingleDelete(certificate._id)
                            }
                          />
                        </div>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="9" style={{ textAlign: "center" }}>
                      No Data Available
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </div>
          {/* Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
          />
          {/* Pagination */}
        </>
      )}
      <Modal
        isOpen={isDeleteModal}
        onClose={() => {
          setDeleteModal(false);
          setDeleteId(null);
        }}
        title={"Delete Certificate"}
      >
        <div className={styles.modalContent}>
          <p className={styles.modalMessage}>
            {deleteId
              ? "Are you sure you want to delete this certificate?"
              : "Are you sure you want to delete the selected certificates?"}
            <br />
            This action cannot be undone.
          </p>
          <div className={styles.modalActions}>
            <Button
              variant="primary"
              onClick={() => {
                setDeleteModal(false);
                setDeleteId(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={deleteId ? confirmSingleDelete : handleBulkDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
