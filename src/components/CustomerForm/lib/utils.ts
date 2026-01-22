import { object, string, type InferType } from "yup";

export const customerSchema = object({
    name: string().required("Name is required"),
    email: string().email("Email is not valid").required("Email is required"),
    phone: string().required("Phone is required"),
    company: string().optional(),
    notes: string().optional(),
});

export type CustomerFormType = InferType<typeof customerSchema>;