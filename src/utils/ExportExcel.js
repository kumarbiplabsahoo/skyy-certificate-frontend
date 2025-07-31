import * as XLSX from "xlsx";

// Truncate long text if needed
const truncate = (value, max = 100) => {
  if (typeof value === "string" && value.length > max) {
    return value.substring(0, max) + "...";
  }
  return value;
};

export const exportToExcel = (data, fileName = "Data", excludedFields) => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Get keys excluding unwanted fields
  const keys = Object.keys(data[0]).filter((key) => !excludedFields.includes(key));

  // Format and truncate data
  const filteredData = data.map((item, index) => {
    const filteredItem = { "S.No.": index + 1 };
    keys.forEach((key) => {
      filteredItem[key] = truncate(item[key]);
    });
    return filteredItem;
  });

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Certificates");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};