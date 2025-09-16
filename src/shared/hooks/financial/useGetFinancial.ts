import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/queryKeys";
import { financialService } from "../../services/financial";
import type { IGetFinanceParams } from "../../../types/financial";

export const useGetFinancial = (params?: IGetFinanceParams) => {
  return useQuery({
    queryKey: queryKeys.financial.list(params ?? {}),
    queryFn: () => financialService.getFinance(params),
  });
};
