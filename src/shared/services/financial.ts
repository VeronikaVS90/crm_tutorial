import type {
  ICreateFinanceBody,
  IFinance,
  IUpdateFinanceBody,
} from "../../types/financial";
import { api } from "./api";

async function getFinance() {
  const res = await api.get<IFinance[]>("/financial");
  return res.data;
}

async function getFinanceById(financeId: string) {
  const res = await api.get<IFinance>(`/financial/${financeId}`);
  return res.data;
}

async function createFinance(data: ICreateFinanceBody) {
  const res = await api.post<IFinance[]>("/financial", data);
  return res.data;
}

async function updateFinance({ id, ...data }: IUpdateFinanceBody) {
  const res = await api.put<IFinance>(`/financial/${id}`, data);
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
