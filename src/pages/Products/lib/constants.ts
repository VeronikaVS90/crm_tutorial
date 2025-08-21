import dayjs from "dayjs";
import type { ITableColumn } from "../../../components/Table/lib";
import type { IProduct } from "../../../types/products";

export const productColumns: ITableColumn<IProduct>[] = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  {
    id: "createdAt",
    label: "Created At",
    row: ({ createdAt }) => dayjs(createdAt).format("DD/MM/YYYY, HH:mm"),
  },
  {
    id: "isAvailable",
    label: "Is Avaliable",
    row: (product) => (product.isAvailable ? "Yes" : "No"),
  },
  { id: "price", label: "Price" },
  { id: "rating", label: "Rating" },
];
