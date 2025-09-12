import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import CircularIndeterminate from "../../components/Loader/Loader";
import { Table } from "../../components/Table";
import { productColumns } from "./lib";
import { TableHeader } from "../../components/Table";
import { CreateProductModal } from "../../components/Modal";
import { productsService } from "../../shared/services/products";
import { queryKeys } from "../../shared/react-query/queryKeys";

const Products = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: queryKeys.products.list,
    queryFn: productsService.getProducts,
  });

  const handleCreate = () => {
    setOpen(true);
  };

  return (
    <>
      {isLoading && <CircularIndeterminate />}
      <TableHeader
        title="Products"
        onCreate={handleCreate}
        onSearch={() => {}}
      />

      <Table
        rows={products}
        columns={productColumns}
        rowOnClick={({ id }) => navigate(`/products/${id}`)}
      />

      <CreateProductModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Products;
