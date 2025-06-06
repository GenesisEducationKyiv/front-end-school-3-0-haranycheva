import { FieldError } from "react-hook-form";

type PossibleFieldError = FieldError | { message?: string };

export const getErrorMessage = (error?: PossibleFieldError | string | null) => {
  if (!error) return null;
  if (typeof error === 'string') return error;
  return error.message ?? 'Error';
}
