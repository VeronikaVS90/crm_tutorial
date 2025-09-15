import { useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import CircularIndeterminate from "../../components/Loader/Loader";
import { Table } from "../../components/Table";
import { productColumns } from "./lib";
import { TableHeader } from "../../components/Table";
import { CreateProductModal } from "../../components/Modal";
import { useGetProducts } from "../../shared/hooks/products/useGetProducts";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const [searchDebounced] = useDebounce(search, 500);

  const { data: products = [], isLoading } = useGetProducts({
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
        title="Products"
        search={search}
        onCreate={handleCreate}
        onSearch={(value) => setSearch(value)}
      />

      <Table
        rows={products}
        columns={productColumns}
        rowOnClick={({ id }) => navigate(`/products/${id}`)}
        onChangePage={(value) => setPage(value)}
        onChangeRowsPerPage={(value) => setLimit(value)}
        page={page}
        rowsPerPage={limit}
        total={100}
      />

      <CreateProductModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Products;
