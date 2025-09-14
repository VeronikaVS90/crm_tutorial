import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsService } from "../../shared/services/products";
import { handleError } from "../../shared/services/errorHandler";
import CircularIndeterminate from "../../components/Loader/Loader";
import {
  productSchema,
  type ProductFormType,
} from "../../components/ProductForm/lib";
import ProductForm from "../../components/ProductForm";
import { ProductReadonlyInfo } from "../../components/ui";
import { ButtonActions } from "../../components/ui";
import { queryKeys } from "../../shared/react-query/queryKeys";

export default function ProductDetails() {
  const { productId = "" } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const form = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
  });

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.products.details(productId),
    queryFn: () => productsService.getProductById(productId),
    enabled: !!productId,
  });

  const queryClient = useQueryClient();

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: productsService.updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.details(data.id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.list,
      });
    },
    onError: (error) => {
      handleError(error, "Failed to update product. Please, try again later.");
    },
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: productsService.deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.list,
      });
    },

    onError: (error) => {
      handleError(error, "Failed to delete product. Please, try again later.");
    },
  });

  const handleUpdateProduct: SubmitHandler<ProductFormType> = (data) => {
    if (!product) return;
    updateProduct(
      { ...data, id: product.id },
      { onSuccess: () => setEditMode(false) }
    );
  };

  const handleDeleteProduct = async () => {
    if (!product) return;

    deleteProduct(product.id, {
      onSuccess: () => navigate("/products", { replace: true }),
    });
  };

  useEffect(() => {
    if (!product) return;
    form.reset({
      category: product.category,
      isAvailable: product.isAvailable,
      name: product.name,
      amount: product.amount,
      price: product.price,
    });
  }, [product, form]);

  if (isLoading) return <CircularIndeterminate />;

  if (isError) return <p>Not found</p>;

  if (!product) return null;

  return (
    <>
      <ProductReadonlyInfo product={product} />

      <ProductForm disabled={!editMode || isUpdating} form={form} />

      <ButtonActions
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
      />
    </>
  );
}
