import { FormFieldTypes } from "../components/inputs/form-control-min";

export const signUpFields: FormFieldTypes[] = [
  {
    label: "Full name",
    id: "full_name",
    name: "full_name",
    type: "text",
    autoComplete: "full_name",
    required: true,
    placeholder: "Enter full name",
  },
  {
    label: "Email address",
    id: "email_address",
    name: "email",
    type: "email",
    autoComplete: "email",
    required: true,
    placeholder: "Email address",
  },
  {
    label: "Your Password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "password",
    required: true,
    placeholder: "Password",
  },
];
export const loginFields: FormFieldTypes[] = [
  {
    label: "Email address",
    id: "email_address",
    name: "email",
    type: "email",
    autoComplete: "email",
    required: true,
    placeholder: "Email address",
  },
  {
    label: "Password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    required: true,
    placeholder: "Password",
  },
];
