"use client";

import { useField } from "@/components/tailadmin/ui/field";
import { cn } from "@/components/tailadmin/utils";
import * as React from "react";

function Textarea({ className, id, ...props }: React.ComponentProps<"textarea">) {
  const field = useField();
  const resolvedId = id ?? field?.id;

  return (
    <textarea
      id={resolvedId}
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full min-w-0 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-4 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 focus-visible:border-brand-300 focus-visible:ring-3 focus-visible:ring-brand-500/20 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100/50 disabled:text-gray-400 disabled:shadow-none aria-invalid:border-red-500 aria-invalid:ring-3 aria-invalid:ring-red-500/20 focus:aria-invalid:border-red-500 focus:aria-invalid:ring-red-500/20 focus-visible:aria-invalid:border-red-500 focus-visible:aria-invalid:ring-red-500/20 data-[success=true]:border-green-500 data-[success=true]:ring-3 data-[success=true]:ring-green-500/20 focus:data-[success=true]:border-green-500 focus:data-[success=true]:ring-green-500/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
