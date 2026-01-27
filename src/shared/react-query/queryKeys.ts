import type { IGetFinanceParams } from "../../types/financial";
import type { IGetProductParams } from "../../types/products";
import type { IGetCustomerParams } from "../../types/customers";

export const queryKeys = {
  products: {
    all: ["products"],
    list: ({ name, page, limit }: IGetProductParams) => [
      "products",
      { name, page, limit },
    ],
    details: (productId: string) => ["product", productId],
  },

  financial: {
  all: ["financial"],
  list: ({ type, page, limit, customerId }: IGetFinanceParams) => [
    "financial",
    { type, page, limit, customerId },
  ],
  details: (financeId: string) => ["finance", financeId],
},

  customers: {
    all: ["customers"],
    list: ({ name, page, limit }: IGetCustomerParams) => [
      "customers",
      {name, page, limit},
    ],
    details: (customerId: string) => ["customer", customerId],
  },
};
