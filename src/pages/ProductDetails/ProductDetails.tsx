import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IProduct } from "../../types/products";
import { productsService } from "../../shared/services/products";
import { handleError } from "../../shared/services/errorHandler";
import CircularIndeterminate from "../../components/Loader/Loader";
import { productsStore } from "../../shared/store/products";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  productSchema,
  type ProductFormType,
} from "../../components/ProductForm/lib";
import ProductForm from "../../components/ProductForm";
import { ProductReadonlyInfo } from "../../components/ui/Product";
import { ProductActions } from "../../components/ui/Product";

export default function ProductDetails() {
  const { productId = "" } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
    defaultValues: product || {},
  });

  const fetchProduct = async (productId: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const product = await productsService.getProductById(productId);
      setProduct(product);
      form.reset({
        category: product.category,
        isAvailable: product.isAvailable,
        name: product.name,
        amount: product.amount,
        price: product.price,
      });
    } catch (error) {
      setError(error);
      handleError(error, "Failed to load product. Please, try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct: SubmitHandler<ProductFormType> = async (data) => {
    if (!product) return;

    try {
      setIsUpdating(true);
      await productsStore.updateProduct({ ...data, id: product.id });
      await fetchProduct(product.id);
      setEditMode(false);
    } catch (error) {
      handleError(error, "Failed to update product. Please, try again later.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product) return;

    try {
      setIsDeleting(true);
      await productsStore.deleteProduct(product.id);
      navigate("/products", { replace: true });
    } catch (error) {
      handleError(error, "Failed to delete product. Please, try again later.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  if (isLoading) return <CircularIndeterminate />;

  if (error) return <p>Not found</p>;

  if (!product) return null;

  return (
    <>
      <ProductReadonlyInfo product={product} />

      <ProductForm disabled={!editMode || isUpdating} form={form} />

      <ProductActions
        editMode={editMode}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        onEnableEdit={() => setEditMode(true)}
        onReset={() => {
          setEditMode(false);
          form.reset({
            category: product.category,
            isAvailable: product.isAvailable,
            name: product.name,
            amount: product.amount,
            price: product.price,
          });
        }}
        onSave={form.handleSubmit(handleUpdateProduct)}
        onDelete={handleDeleteProduct}
        onGoBack={() => navigate("/products")}
        form={form}
      />
    </>
  );
}
