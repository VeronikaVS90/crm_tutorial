import type { IFinance } from "../../types/financial";
import { api } from "./api";

async function getFinance() {
  const res = await api.get<IFinance[]>("/financial");
  return res.data;
}

export const financialService = {
  getFinance,
};
