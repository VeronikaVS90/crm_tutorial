import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/queryKeys";
import { customersService } from "../../services/customers";
import type { IGetCustomerParams } from "../../../types/customers";

export const useGetCustomers = (params?: IGetCustomerParams) => {
    return useQuery({
        queryKey: queryKeys.customers.list(params ?? {}),
        queryFn: () => customersService.getCustomers(params),
    });
};