import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";
import { FieldError } from "@/components/ui/field-error";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export function Select({
  className,
  children,
  error,
  id,
  ...props
}: SelectProps) {
  return (
    <>
      <select
        aria-describedby={error && id ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className={clsx("ui-field", "ui-select", className)}
        id={id}
        {...props}
      >
        {children}
      </select>
      <FieldError id={id ? `${id}-error` : undefined}>{error}</FieldError>
    </>
  );
}
