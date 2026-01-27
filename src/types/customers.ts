export interface ICustomerResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  createdAt: string;
  notes?: string;
}

export interface ICreateCustomerBody {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

export interface IUpdateCustomerBody extends ICreateCustomerBody {
  id: string;
}

export interface IGetCustomerParams {
  name?: string;
  page?: number;
  limit?: number;
}