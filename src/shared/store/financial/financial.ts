import { makeObservable, observable, action, runInAction } from "mobx";
import { financialService } from "../../services/financial";
import type { IFinance } from "../../../types/financial";

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
      console.error("Error fetching finance:", err);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const financialStore = new FinancialStore();
