import dayjs from "dayjs";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import type { ITableColumn } from "../../../components/Table/lib";
import type { ICustomerResponse } from "../../../types/customers";

const truncate = (value: string, max = 40) =>
  value.length > max ? `${value.slice(0, max)}…` : value;

export const customerColumns: ITableColumn<ICustomerResponse>[] = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "company", label: "Company", cell: ({ company }) => company ?? "-" },
  {
    id: "notes",
    label: "Notes",
    cell: ({ notes }) => {
      if (!notes) return "-";
      const short = truncate(notes);
      return React.createElement(Tooltip, {
        title: notes,
        arrow: true,
        enterDelay: 300,
        children: React.createElement("span", null, short),
      });
    },
  },
  {
    id: "createdAt",
    label: "Created At",
    cell: ({ createdAt }) => dayjs(createdAt).format("DD.MM.YYYY, HH:mm"),
  },
];

