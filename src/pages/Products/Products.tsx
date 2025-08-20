import { useEffect } from "react";
import { productsStore } from "../../shared/store/products";
import { observer } from "mobx-react-lite";
import CircularIndeterminate from "../../components/Loader/Loader";

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
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
          </li>
        ))}
      </ul>
    </>
  );
});

export default Products;
