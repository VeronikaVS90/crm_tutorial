import { object, string, type ObjectSchema } from "yup";

export interface CustomerFormValues {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

export const customerSchema: ObjectSchema<CustomerFormValues> = object({
  name: string().required("Name is required"),
  email: string().email("Email is not valid").required("Email is required"),
  phone: string().required("Phone is required"),
  company: string().optional(),
  notes: string().optional(),
});

export type CustomerFormType = CustomerFormValues;