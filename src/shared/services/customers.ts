import type {
    ICreateCustomerBody,
    ICustomerResponse,
    IGetCustomerParams,
    IUpdateCustomerBody
} from "../../types/customers";
import { Customer } from "../entities/customer";
import { api } from "./api";

async function getCustomers(params?: IGetCustomerParams) {
    const res = await api.get<ICustomerResponse[]>("/customers", { params });
    return res.data;
}

async function getCustomerById(customerId: string) {
    const res = await api.get<ICustomerResponse>(`/customers/${customerId}`);
    return new Customer(res.data);
}

async function createCustomer(data: ICreateCustomerBody) {
    const res = await api.post<ICustomerResponse>("/customers", data);
    return res.data;
}

async function updateCustomer({ id, ...data }: IUpdateCustomerBody) {
    const res = await api.put<ICustomerResponse>(`/customers/${id}`, data);
    return res.data;
}

async function deleteCustomer(customerId: string) {
    await api.delete(`/customers/${customerId}`);
}

export const customersService = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};