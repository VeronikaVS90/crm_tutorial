export interface IProduct {
  id: string;
  category: string;
  createdAt: string;
  isAvailable: boolean;
  name: string;
  price: number;
  rating: number;
}

export interface ICreateProductBody {
  category: string;
  isAvailable: boolean;
  name: string;
  price: number;
}
