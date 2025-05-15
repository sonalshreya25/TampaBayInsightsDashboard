/**
 * Triggers download of a CSV file from an array of data objects.
 *
 * @param {Array} dataArray - Array of objects with `date` and `value` properties
 * @param {string} filename - Desired name of the downloaded CSV file (default: "data.csv")
 */

export const downloadCSV = (dataArray, filename = "data.csv") => {
  if (!dataArray.length) return;
    // Create CSV header
  const csvHeader = "Date,Value";
  const csvRows = dataArray.map(row => `${row.date},${row.value}`);
    // Combine header and rows into one CSV string
  const csvContent = [csvHeader, ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a temporary object URL for the Blob
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);

    // Trigger the download
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
