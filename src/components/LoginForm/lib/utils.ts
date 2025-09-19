import { object, string, type InferType } from "yup";

export const loginSchema = object({
  email: string().trim().email().required(),
  password: string().trim().required(),
});

export type LoginFormType = InferType<typeof loginSchema>;
