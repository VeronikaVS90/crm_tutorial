import { useEffect, useState } from "react";
import { productsStore } from "../../shared/store/products";
import { observer } from "mobx-react-lite";
import CircularIndeterminate from "../../components/Loader/Loader";
import { Table } from "../../components/Table";
import { productColumns } from "./lib";
import { TableHeader } from "../../components/Table";
import { CreateProductModal } from "../../components/Modal";

const Products = observer(() => {
  const { products, isLoading } = productsStore;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    productsStore.getProducts();
  }, []);

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

      <Table rows={products} columns={productColumns} />

      <CreateProductModal open={open} onClose={() => setOpen(false)} />
    </>
  );
});

export default Products;
