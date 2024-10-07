import React, { InputHTMLAttributes } from "react";
import { Field } from "formik";
import { cn } from "@/lib/utils";

interface InputProps {
  hasError?: string;
  isTouched?: boolean;
  name: string;
  placeholder: string;
  errorMessage?: string;
  isRequired?: boolean;
  as: string;
}

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   hasError?: string;
//   isTouched?: boolean;
//   name: string;
//   placeholder: string;
//   errorMessage?: string;
//   isRequired?: boolean;
// }

const Input: React.FC<InputProps> = ({
  hasError,
  isTouched,
  name,
  placeholder,
  errorMessage,
  as = "input",
  isRequired = true,
}) => {
  return (
    <div>
      <Field
        as={as}
        name={name}
        className={cn(
          "h-[2.125rem] w-full border-b-2 border-b-accent/30 text-[1.375rem] text-accent placeholder-accent/30 focus:placeholder-accent focus:outline-none",
          isTouched && hasError
            ? "border-b-red-600"
            : " focus:border-b-accent focus:ring-accent",
        )}
        placeholder={placeholder}
      />
      {isTouched && hasError && (
        <p className="mt-2 text-xs italic text-red-600">
          {errorMessage as string}
        </p>
      )}
    </div>
  );
};

export default Input;
