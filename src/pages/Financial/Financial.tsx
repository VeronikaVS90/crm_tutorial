import { useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import CircularIndeterminate from "../../components/Loader/Loader";
import { Table } from "../../components/Table";
import { financialColumns } from "./lib";
import { TableHeader } from "../../components/Table";
import { CreateFinancialModal } from "../../components/Modal";
import { useGetFinancial } from "../../shared/hooks/financial/useGetFinancial";

const Financial = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const [searchDebounced] = useDebounce(search, 500);

  const { data: financial = [], isLoading } = useGetFinancial({
    type: searchDebounced,
    page,
    limit,
  });

  const handleCreate = () => {
    setOpen(true);
  };

  return (
    <>
      {isLoading && <CircularIndeterminate />}
      <TableHeader
        title="Financial"
        search={search}
        onCreate={handleCreate}
        onSearch={(value) => {
          setSearch(value);
        }}
      />
      <Table
        rows={financial}
        columns={financialColumns}
        rowOnClick={({ id }) => navigate(`/financial/${id}`)}
        onChangePage={(value) => setPage(value)}
        onChangeRowsPerPage={(value) => setLimit(value)}
        page={page}
        rowsPerPage={limit}
        total={100}
      />

      <CreateFinancialModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Financial;
