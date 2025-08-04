import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const truncate = (value, max = 100) => {
  if (typeof value === "string" && value.length > max) {
    return value.substring(0, max) + "...";
  }
  return value;
};

export const exportToPDF = (data, fileName = "Data", excludedFields) => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  const allKeys = Object.keys(data[0]);
  const filteredKeys = allKeys.filter((key) => !excludedFields.includes(key));

  // Final header: S.No. + filtered keys
  const tableColumn = ["S.No.", ...filteredKeys];

  // Each row: serial number + values
  const tableRows = data.map((item, index) => {
    const row = [index + 1]; // serial number
    filteredKeys.forEach((key) => {
      row.push(truncate(item[key]));
    });
    return row;
  });

  const doc = new jsPDF({
    orientation: "landscape",
    format: "a2",
    unit: "pt",
  });

  doc.text(`${fileName} List`, 40, 30);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    styles: {
      fontSize: 8,
      overflow: "linebreak",
      cellWidth: "wrap",
    },
    headStyles: {
      fillColor: [33, 150, 243],
    },
    tableWidth: "auto",
    horizontalPageBreak: true,
    horizontalPageBreakRepeat: 1,
  });

  doc.save(`${fileName}.pdf`);
};
