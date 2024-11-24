import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "block w-full rounded-sm border-0 p-1.5 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-amber-800 focus:ring-2 focus:ring-inset sm:text-sm/6 placeholder:text-xs",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
