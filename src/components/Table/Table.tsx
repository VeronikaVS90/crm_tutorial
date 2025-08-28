import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import type { ITableColumn, ITableRow } from "./lib";

interface TableProps<T extends ITableRow> {
  columns: ITableColumn<T>[];
  rows: T[];
}

export default function Table<T extends ITableRow>({
  columns,
  rows,
}: TableProps<T>) {
  //   const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //   const handleChangePage = (event: unknown, newPage: number) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  sx={{
                    minWidth: column.minWidth,
                    backgroundColor: "#f5f5f5",
                    fontWeight: "bold",
                    color: "#333",
                    borderBottom: "2px solid #ccc",
                    boxShadow: "inset 0 -1px 0 #ddd",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                  {columns.map((column) => {
                    const value = data[column.id];
                    return (
                      <TableCell key={String(column.id)}>
                        {column.cell?.(data) ?? value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
