import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination
} from "@mui/material";
// DataTable component takes data and an optional 'searchTerm'
const DataTable = ({ data, searchTerm = "" }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const lowerSearch = searchTerm.toLowerCase();

  // Flattened and filtered rows
  const allRows = Object.entries(data).flatMap(([county, entries]) =>
    entries
      .filter(
        (entry) =>
          entry.date.toLowerCase().includes(lowerSearch) ||
          entry.value.toString().includes(lowerSearch)
      )
      .map((entry) => ({
        county,
        date: entry.date,
        value: entry.value
      }))
  );
    // pagination display
  const paginatedRows = allRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

    // Handlers for pagination control
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ mt: 4 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>County</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, idx) => (
              <TableRow key={`${row.county}-${idx}`}>
                <TableCell>{row.county}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={allRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};

export default DataTable;
