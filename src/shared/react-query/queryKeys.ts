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
    list: ["financial"],
    details: (financeId: string) => ["finance", financeId],
  },
};
