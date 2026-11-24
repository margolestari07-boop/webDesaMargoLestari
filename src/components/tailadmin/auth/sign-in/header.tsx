import { cn } from "@/components/tailadmin/utils";

export interface SignInHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function SignInHeader({
  title = "Sign In",
  description = "Enter your email and password to sign in!",
  className,
}: SignInHeaderProps) {
  return (
    <div className={cn("mb-5 sm:mb-8", className)}>
      <h1 className="mb-2 text-title-sm font-semibold text-gray-800 sm:text-title-md">
        {title}
      </h1>
      <p className="text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}
