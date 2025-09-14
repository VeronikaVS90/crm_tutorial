export const queryKeys = {
  products: {
    list: ["products"],
    details: (productId: string) => ["product", productId],
  },

  financial: {
    list: ["financial"],
    details: (financeId: string) => ["finance", financeId],
  },
};
