import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/queryKeys";
import { productsService } from "../../services/products";
import type { IGetProductParams } from "../../../types/products";

export const useGetProducts = (params?: IGetProductParams) => {
  return useQuery({
    queryKey: queryKeys.products.list(params ?? {}),
    queryFn: () => productsService.getProducts(params),
  });
};
