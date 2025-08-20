import { makeObservable, observable, action, runInAction } from "mobx";
import { productsService } from "../../services/products";
import type { IProduct } from "../../../types/products";

class ProductsStore {
  products: IProduct[] = [];
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      products: observable,
      isLoading: observable,
      getProducts: action,
    });
  }

  async getProducts() {
    this.isLoading = true;
    try {
      const data = await productsService.getProducts();
      runInAction(() => {
        this.products = data;
      });
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const productsStore = new ProductsStore();
