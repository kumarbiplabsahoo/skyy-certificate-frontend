const truncate = (value, max = 100) => {
  if (typeof value === "string" && value.length > max) {
    return value.substring(0, max) + "...";
  }
  return value;
};

export const exportToCSV = (data, fileName = "Data", excludedFields) => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Include only required fields
  const keys = Object.keys(data[0]).filter(
    (key) => !excludedFields.includes(key)
  );

  // CSV Header
  const csvHeader = ["S.No.", ...keys].join(",");

  // CSV Rows
  const csvRows = data.map((item, index) =>
    [index + 1, ...keys.map((key) => `"${truncate(item[key])}"`)].join(",")
  );

  const csvContent = [csvHeader, ...csvRows].join("\n");

  // Trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
