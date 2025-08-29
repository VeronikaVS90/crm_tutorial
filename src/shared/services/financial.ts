import type { ICreateFinanceBody, IFinance } from "../../types/financial";
import { api } from "./api";

async function getFinance() {
  const res = await api.get<IFinance[]>("/financial");
  return res.data;
}

async function createFinance(data: ICreateFinanceBody) {
  const res = await api.post<IFinance[]>("/financial", data);
  return res.data;
}

export const financialService = {
  getFinance,
  createFinance,
};
