import React, { FC, ReactNode } from "react";

interface LabelProps {
  labelFor: string;
  children: ReactNode;
}

const Label: FC<LabelProps> = ({ labelFor, children }) => {
  return (
    <label
      htmlFor={labelFor}
      className="mb-1.5 inline-block text-xl font-medium text-white"
    >
      {children}
    </label>
  );
};

export default Label;
