import TopFilter from "../../components/dashboard/TopFilter";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/ui/Table";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import styles from "./style.module.css";
import { Button } from "../../components/ui/Button";
import { Pagination } from "../../components/ui/Pagination";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UseDash } from "../../hooks/useDash";

const coreHrData = [
  {
    _id: "1",
    certificateType: "Course Completion",
    email: "john.doe@example.com",
    studentName: "John Doe",
    duration: "3 Months",
    course: "Web Development",
    date: "2023-05-15",
  },
  {
    _id: "2",
    certificateType: "Workshop Participation",
    email: "jane.smith@example.com",
    studentName: "Jane Smith",
    duration: "2 Days",
    course: "UI/UX Design",
    date: "2023-06-20",
  },
  {
    _id: "3",
    certificateType: "Professional Certification",
    email: "robert.johnson@example.com",
    studentName: "Robert Johnson",
    duration: "6 Months",
    course: "Data Science",
    date: "2023-04-10",
  },
  {
    _id: "4",
    certificateType: "Internship Completion",
    email: "emily.wilson@example.com",
    studentName: "Emily Wilson",
    duration: "4 Months",
    course: "Digital Marketing",
    date: "2023-07-05",
  },
  {
    _id: "5",
    certificateType: "Course Completion",
    email: "michael.brown@example.com",
    studentName: "Michael Brown",
    duration: "3 Months",
    course: "Mobile App Development",
    date: "2023-08-12",
  },
];

export default function Dashboard() {
  const { certificates } = useSelector((state) => state.dash);
  const {
    totalPages,
    totalRecords,
    currentPage,
    recordsPerPage,
    setCurrentPage,
    // setRecordsPerPage,
  } = UseDash();

  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(coreHrData.map((item) => item._id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleBulkDelete = () => {
    // Your delete logic here
    console.log("Deleting items:", selectedItems);
    setSelectedItems([]);
    setIsAllSelected(false);
  };

  return (
    <div className={styles.container}>
      <TopFilter
        onSearch={(term) => console.log("Search:", term)}
        onDateFilter={(range) => console.log("Date range:", range)}
        onExportPDF={() => console.log("Export PDF")}
        onExportXLSX={() => console.log("Export Excel")}
        onExportCSV={() => console.log("Export CSV")}
        // ... other props
        onBulkDelete={handleBulkDelete}
        selectedCount={selectedItems.length}
        isAllSelected={isAllSelected}
      />

      <div className={styles.tablecontainer}>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  className={styles.checkbox}
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
                      />
                      <Button
                        variant="danger"
                        icon={<FiTrash className={styles.icon} />}
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
    </div>
  );
}
