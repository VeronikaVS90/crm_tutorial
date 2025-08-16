import { useEffect } from "react";
import { productsStore } from "../../shared/store/products";
import { observer } from "mobx-react-lite";

const Products = observer(() => {
  const { products } = productsStore;

  useEffect(() => {
    productsStore.getProducts();
  }, []);

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
