import { passwordValidation } from "@/src/schemas/password.schema";
import {
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  NAME_REQUIRED,
} from "@/src/schemas/schema-errors";
import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required(NAME_REQUIRED),
  email: yup.string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
  password: passwordValidation,
});
