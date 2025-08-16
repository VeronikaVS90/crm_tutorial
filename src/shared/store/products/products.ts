import { makeObservable, observable, action, runInAction } from "mobx";
import { productsService } from "../../services/products";
import type { IProduct } from "../../../types/products";

class ProductsStore {
  products: IProduct[] = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      getProducts: action,
    });
  }

  async getProducts() {
    const products = await productsService.getProducts();

    runInAction(() => {
      this.products = products;
    });
  }
}

export const productsStore = new ProductsStore();
