import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IProduct, IUpdateProductBody } from "../../types/products";
import { productsService } from "../../shared/services/products";
import { handleError } from "../../shared/services/errorHandler";
import CircularIndeterminate from "../../components/Loader/Loader";
import ProductInfo from "../../components/ProductInfo";
import { productsStore } from "../../shared/store/products";

export default function ProductDetails() {
  const { productId = "" } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const fetchProduct = async (productId: string) => {
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
  };

  const handleUpdateProduct = async (data: IUpdateProductBody) => {
    await productsStore.updateProduct(data);
    await fetchProduct(data.id);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productsStore.deleteProduct(productId);
      navigate("/products", { replace: true });
    } catch (error) {
      handleError(error, "Failed to delete product. Please, try again later.");
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  if (isLoading) return <CircularIndeterminate />;

  if (error) return <p>Not found</p>;

  if (!product) return null;

  return (
    <ProductInfo
      product={product}
      onUpdateProduct={handleUpdateProduct}
      onDeleteProduct={handleDeleteProduct}
    />
  );
}
