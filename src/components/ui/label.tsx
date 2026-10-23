import clsx from "clsx";
import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ children, className, required, ...props }: LabelProps) {
  return (
    <label className={clsx("ui-label", className)} {...props}>
      {children}
      {required ? <span aria-hidden="true"> *</span> : null}
    </label>
  );
}
