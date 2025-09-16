import type {
  ICreateFinanceBody,
  IFinanceResponse,
  IGetFinanceParams,
  IUpdateFinanceBody,
} from "../../types/financial";
import { Finance } from "../entities/finance";
import { api } from "./api";

async function getFinance(params?: IGetFinanceParams) {
  const res = await api.get<IFinanceResponse[]>("/financial", { params });
  return res.data;
}

async function getFinanceById(financeId: string) {
  const res = await api.get<IFinanceResponse>(`/financial/${financeId}`);
  return new Finance(res.data);
}

async function createFinance(data: ICreateFinanceBody) {
  const res = await api.post<IFinanceResponse[]>("/financial", data);
  return res.data;
}

async function updateFinance({ id, ...data }: IUpdateFinanceBody) {
  const res = await api.put<IFinanceResponse>(`/financial/${id}`, data);
  return res.data;
}

async function deleteFinance(financeId: string) {
  await api.delete(`/financial/${financeId}`);
}

export const financialService = {
  getFinance,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance,
};
