export const queryKeys = {
  products: {
    list: ["products"],
    details: (productId: string) => ["product", productId],
  },
};
