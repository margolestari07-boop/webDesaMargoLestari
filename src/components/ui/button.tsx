import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
> {
  variant?: "primary" | "secondary" | "quiet";
  size?: "default" | "small";
}

export function Button({
  children,
  className,
  size = "default",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "ui-button",
        `ui-button--${variant}`,
        `ui-button--${size}`,
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
