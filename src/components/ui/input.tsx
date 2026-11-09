import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { FieldError } from "@/components/ui/field-error";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className, error, id, ...props }: InputProps) {
  return (
    <>
      <input
        aria-describedby={error && id ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className={clsx("ui-field", className)}
        id={id}
        {...props}
      />
      <FieldError id={id ? `${id}-error` : undefined}>{error}</FieldError>
    </>
  );
}
