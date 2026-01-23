import { useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import CircularIndeterminate from "../../components/Loader/Loader";
import { Table } from "../../components/Table";
import { customerColumns } from "./lib";
import { TableHeader } from "../../components/Table";
import { CreateCustomerModal } from "../../components/Modal";
import { useGetCustomers } from "../../shared/hooks/customers/useGetCustomers";

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const [searchDebounced] = useDebounce(search, 500);

  const { data: customers = [], isLoading } = useGetCustomers({
    name: searchDebounced,
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
        title="Customers"
        search={search}
        onCreate={handleCreate}
        onSearch={(value) => setSearch(value)}
      />

      <Table
        rows={customers}
        columns={customerColumns}
        rowOnClick={({ id }) => navigate(`/customers/${id}`)}
        onChangePage={(value) => setPage(value)}
        onChangeRowsPerPage={(value) => setLimit(value)}
        page={page}
        rowsPerPage={limit}
        total={100}
      />

      <CreateCustomerModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Customers;