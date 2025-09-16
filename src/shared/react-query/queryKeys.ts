import type { IGetFinanceParams } from "../../types/financial";
import type { IGetProductParams } from "../../types/products";

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
    list: ({ type, page, limit }: IGetFinanceParams) => [
      "financial",
      { type, page, limit },
    ],
    details: (financeId: string) => ["finance", financeId],
  },
};
