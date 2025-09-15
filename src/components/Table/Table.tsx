import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import type { ITableColumn, ITableRow } from "./lib";
import Tooltip from "@mui/material/Tooltip";

interface TableProps<T extends ITableRow> {
  columns: ITableColumn<T>[];
  rows: T[];
  rowOnClick?: (data: T) => void;
  page: number;
  onChangePage: (value: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (value: number) => void;
  total: number;
}

export default function Table<T extends ITableRow>({
  columns,
  rows,
  rowOnClick,
  page,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPage,
  total,
}: TableProps<T>) {
  const handleChangePage = (_event: unknown, newPage: number) => {
    onChangePage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeRowsPerPage(+event.target.value);
    onChangePage(1);
  };

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
                  {column.headerTooltip ? (
                    <Tooltip
                      title={column.headerTooltip}
                      arrow
                      enterDelay={400}
                    >
                      <span
                        style={{
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        {column.label}
                      </span>
                    </Tooltip>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data) => {
              return (
                <TableRow
                  onClick={() => rowOnClick?.(data)}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={data.id}
                >
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
