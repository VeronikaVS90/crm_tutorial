import { useForm } from "react-hook-form";
import type { IProduct } from "../../types/products";
import ProductForm from "../ProductForm/ProductForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema, type ProductFormType } from "../ProductForm/lib";

interface ProductInfoProps {
  product: IProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const form = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      category: product.category,
      isAvailable: product.isAvailable,
      name: product.name,
      price: product.price,
    },
  });

  return (
    <div>
      <ProductForm disabled form={form} />
    </div>
  );
}
