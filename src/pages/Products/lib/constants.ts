import dayjs from "dayjs";
import type { ITableColumn } from "../../../components/Table/lib";
import type { IProduct } from "../../../types/products";

export const productColumns: ITableColumn<IProduct>[] = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  {
    id: "isAvailable",
    label: "Is Avaliable",
    cell: (product) => (product.isAvailable ? "Yes" : "No"),
  },
  { id: "amount", label: "Amount" },
  { id: "price", label: "Price" },
  { id: "cost", label: "Cost", headerTooltip: "Amount * Price" },
  { id: "rating", label: "Rating" },
  {
    id: "createdAt",
    label: "Created At",
    cell: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY, HH:mm"),
  },
];
