import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IProduct } from "../../types/products";
import { productsService } from "../../shared/services/products";
import { handleError } from "../../shared/services/errorHandler";
import CircularIndeterminate from "../../components/Loader/Loader";
import ProductInfo from "../../components/ProductInfo";

export default function ProductDetails() {
  const { productId = "" } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setIsLoading(true);
        const product = await productsService.getProductById(productId);
        setProduct(product);
      } catch (error) {
        setError(error);
        handleError(error, "Failed to load product. Please, try again later.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [productId]);

  if (isLoading) return <CircularIndeterminate />;

  if (error) return <p>Not found</p>;

  if (!product) return null;

  return <ProductInfo product={product} />;
}
