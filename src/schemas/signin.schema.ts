import { passwordValidation } from "@/src/schemas/password.schema";
import {
  EMAIL_INVALID,
  EMAIL_REQUIRED,
} from "@/src/schemas/schema-errors";
import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: passwordValidation,
});
