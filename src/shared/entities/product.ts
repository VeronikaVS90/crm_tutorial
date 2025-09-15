import dayjs from "dayjs";
import type { IProductResponse, ProductCategory } from "../../types/products";

export class Product {
  id: string;
  category: ProductCategory;
  createdAt: string;
  isAvailable: boolean;
  name: string;
  amount: number;
  price: number;
  cost: number;
  rating: number;

  constructor(product: IProductResponse) {
    this.id = product.id;
    this.category = product.category;
    this.createdAt = product.createdAt;
    this.isAvailable = product.isAvailable;
    this.name = product.name;
    this.amount = product.amount;
    this.price = product.price;
    this.cost = product.cost;
    this.rating = product.rating;
  }

  get formattedCreatedAt() {
    return dayjs(this.createdAt).format("DD.MM.YYYY, HH:mm");
  }
}
