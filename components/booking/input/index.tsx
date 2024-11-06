import React from "react";
import { Field } from "formik";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Label from "../label";

const inputVariants = cva("w-full ", {
  variants: {
    variant: {
      underlineWithLabel:
        "border-b-white h-[1.7rem] text-gray placeholder:text-gray border-b text-xs focus:outline-none bg-transparent",
      underlineNoLabel:
        "h-[2.125rem] border-b-accent/30 border-b-2 text-[1.375rem] text-accent placeholder-accent/30 focus:placeholder-accent focus:outline-none bg-transparent",
    },
    hasError: {
      true: "border-b-red-600",
      false: "",
    },
  },
  defaultVariants: {
    variant: "underlineNoLabel",
  },
});

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  hasError?: boolean;
  isTouched?: boolean;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  label?: string;
  as?: string;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  variant = "underlineNoLabel",
  className,
  hasError,
  isTouched,
  name,
  placeholder,
  errorMessage,
  label,
  as = "input",
  rows,
  ...props
}) => {
  const combinedStyles = cn(
    inputVariants({
      className,
      variant,
      hasError: hasError && isTouched,
    }),
    isTouched && hasError
      ? "focus:border-b-red-600 focus:ring-red-600"
      : variant === "underlineNoLabel" &&
          "focus:border-b-accent focus:ring-accent",
  );

  return (
    <div className={`${as === "textarea" && "col-span-3"} w-full`}>
      {variant === "underlineWithLabel" && (
        <Label labelFor={name}> {label}</Label>
      )}

      <Field
        as={as}
        id={name}
        name={name}
        className={combinedStyles}
        placeholder={placeholder}
        {...props}
      />

      {isTouched && hasError && (
        <p className="mt-2 text-xs italic text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
