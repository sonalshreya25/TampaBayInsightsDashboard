export const downloadCSV = (dataArray, filename = "data.csv") => {
  if (!dataArray.length) return;

  const csvHeader = "Date,Value";
  const csvRows = dataArray.map(row => `${row.date},${row.value}`);
  const csvContent = [csvHeader, ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
