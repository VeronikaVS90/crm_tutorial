export enum ProductCategory {
  Electronics = "Electronics",
  Clothing = "Clothing",
  Footwear = "Footwear",
  Home = "Home",
  Health = "Health",
  Sports = "Sports",
  Kids = "Kids",
}

export interface IProduct {
  id: string;
  category: ProductCategory;
  createdAt: string;
  isAvailable: boolean;
  name: string;
  amount: number;
  price: number;
  cost: number;
  rating: number;
}

export interface ICreateProductBody {
  category: ProductCategory;
  isAvailable: boolean;
  name: string;
  amount: number;
  price: number;
}

export interface IUpdateProductBody extends ICreateProductBody {
  id: string;
}
