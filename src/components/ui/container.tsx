import clsx from "clsx";
import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
}

export function Container({ className, narrow, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        "ui-container",
        narrow && "ui-container--narrow",
        className,
      )}
      {...props}
    />
  );
}
