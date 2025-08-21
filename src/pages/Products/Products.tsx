import { useEffect } from "react";
import { productsStore } from "../../shared/store/products";
import { observer } from "mobx-react-lite";
import CircularIndeterminate from "../../components/Loader/Loader";
import Table from "../../components/Table";
import { productColumns } from "./lib";

const Products = observer(() => {
  const { products, isLoading } = productsStore;

  useEffect(() => {
    productsStore.getProducts();
  }, []);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <h1>Products</h1>
      <Table rows={products} columns={productColumns} />
    </>
  );
});

export default Products;
