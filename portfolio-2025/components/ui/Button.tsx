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
      // Soft variant matches Figma: light gray background, rounded 12px, subtle dual-shadow
      soft:
        "bg-[#e2e6ed] box-border inline-flex justify-center items-center gap-3 px-[14px] py-[2px] rounded-[12px] shadow-[2px_2px_4px_0px_rgba(94,96,98,0.12)] shadow-[-2px_-2px_4px_0px_rgba(94,96,98,0.12)]",
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
        // Put sizes before variants so variant-specific padding/typography can override size defaults
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...props}
      >
        {variant === "soft" ? (
          // Render exact structure provided for the soft variant (icon group + JetBrains Mono text)
          <>
            <div className="w-4 h-4 relative">
              <div className="w-2.5 h-3.5 left-[2.67px] top-[1.33px] absolute outline-[1.33px] outline-offset-[-0.67px] outline-black" />
              <div className="w-1 h-1.5 left-[7px] top-[1.33px] absolute outline-[1.33px] outline-offset-[-0.67px] outline-black" />
              <div className="w-2.5 h-0 left-[3.33px] top-[1.33px] absolute outline-[1.33px] outline-offset-[-0.67px] outline-black" />
            </div>
            <div className="text-center justify-start text-black text-[14px] font-normal font-['JetBrains_Mono'] leading-[30px]">
              {children}
            </div>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
