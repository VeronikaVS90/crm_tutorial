import { object, string, type InferType } from "yup";

export const registrationSchema = object({
  username: string().trim().required().min(3).max(30),
  email: string().trim().email().required().max(255),
  password: string().trim().required().min(8).max(255),
});

export type RegistrationFormType = InferType<typeof registrationSchema>;
