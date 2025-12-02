"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "soft";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-black text-white border-black hover:bg-gray-900 focus:ring-black",
      outline:
        "bg-transparent text-black border-black/30 hover:bg-black/5 focus:ring-black/30",
      // Soft variant matches Figma: light gray bg, rounded-xl, dual inset/outset shadow, JetBrains Mono
      soft:
        "bg-[#e2e6ed] text-black text-[14px] font-normal font-['JetBrains_Mono'] leading-[30px] border-none px-[14px] py-[2px] rounded-xl gap-3 shadow-[-2px_-2px_4px_0px_rgba(94,96,98,0.12),2px_2px_4px_0px_rgba(94,96,98,0.12)]",
      ghost:
        "bg-transparent text-black border-transparent hover:bg-black/5 focus:ring-black/20",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...props}
      >
        {leftIcon && <span className="shrink-0 w-4 h-4">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0 w-4 h-4">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
