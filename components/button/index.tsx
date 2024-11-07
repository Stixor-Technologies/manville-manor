import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Spinner from "../shared/spinner/index.jsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-base ring-offset-background transition-colors duration-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-accent/90",
        black: "bg-black hover:bg-black/80",
        transparent: "bg-white/10 text-white hover:bg-white/30",
        invert: "bg-white text-accent hover:bg-white/90",
        icon: "bg-transparent text-white capitalize",
      },
      size: {
        default: "h-10 w-[7.5rem]",
        sm: "h-9 rounded-md px-3",
        md: "h-[4.625rem] w-full md:w-[18.5rem]",
        lg: "h-11 rounded-md px-8",
        full: "w-full h-[4rem]",
        icon: "h-auto w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  loading?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, href, loading = false, ...props }) => {
  const Comp: React.ElementType = href ? Link : "button";

  const combinedStyles = cn(buttonVariants({ variant, size, className }));

  return (
    <Comp className={combinedStyles} {...props} {...(href && { href })}>
      {loading ? (
        <Spinner color="text-white" size="size-4" />
      ) : (
        <>{props.children}</>
      )}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
