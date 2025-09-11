import { makeObservable, observable, action, runInAction } from "mobx";
import { financialService } from "../../services/financial";
import type {
  ICreateFinanceBody,
  IUpdateFinanceBody,
  IFinance,
} from "../../../types/financial";
import { handleError } from "../../services/errorHandler";

class FinancialStore {
  financial: IFinance[] = [];
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      financial: observable,
      isLoading: observable,
      getFinance: action,
    });
  }

  async getFinance() {
    this.isLoading = true;
    try {
      const data = await financialService.getFinance();
      runInAction(() => {
        this.financial = data;
      });
    } catch (err) {
      handleError(
        err,
        "Failed to load financial page. Please, try again later."
      );
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async createFinance(finance: ICreateFinanceBody) {
    await financialService.createFinance(finance);
    this.getFinance();
  }

  async updateFinance(finance: IUpdateFinanceBody) {
    await financialService.updateFinance(finance);
    this.getFinance();
  }

  async deleteFinance(financeId: string) {
    await financialService.deleteFinance(financeId);
    this.getFinance();
  }
}

export const financialStore = new FinancialStore();
