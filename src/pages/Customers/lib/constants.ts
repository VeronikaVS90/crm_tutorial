import dayjs from "dayjs";
import type { ITableColumn } from "../../../components/Table/lib";
import type { ICustomerResponse } from "../../../types/customers";

export const customerColumns: ITableColumn<ICustomerResponse>[] = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "company", label: "Company", cell: ({ company }) => company ?? "-" },
  { id: "notes", label: "Notes", cell: ({ notes }) => notes ?? "-" },
  {
    id: "createdAt",
    label: "Created At",
    cell: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY, HH:mm"),
  },
];

