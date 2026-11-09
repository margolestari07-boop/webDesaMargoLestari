import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";
import { FieldError } from "@/components/ui/field-error";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({ className, error, id, ...props }: TextareaProps) {
  return (
    <>
      <textarea
        aria-describedby={error && id ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        className={clsx("ui-field", "ui-textarea", className)}
        id={id}
        {...props}
      />
      <FieldError id={id ? `${id}-error` : undefined}>{error}</FieldError>
    </>
  );
}
