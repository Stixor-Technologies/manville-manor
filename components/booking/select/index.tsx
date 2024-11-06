import React, { FC } from "react";
import { useFormikContext } from "formik";
import Label from "../label";
import Select from "react-select";
import { FormValues, ListItemOption } from "@/utils/types/types";

interface SelectOptions {
  options: ListItemOption[];
  placeholder: string;
  name: string;
  label: string;
  isMulti?: boolean;
  hasError?: boolean;
  isTouched?: boolean;
  errorMessage?: string;
}

const DropwDown: FC<SelectOptions> = ({
  options,
  placeholder,
  name,
  label,
  isMulti = false,
  hasError,
  isTouched,
  errorMessage,
}) => {
  const { setFieldValue } = useFormikContext<FormValues>();

  const handleChange = (selectedOption: any) => {
    if (!isMulti) {
      setFieldValue(name, selectedOption?.value);
    } else {
      const selectedValues = selectedOption
        ? selectedOption.map((option: any) => option?.value)
        : [];
      setFieldValue(name, selectedValues);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <Label labelFor={name}> {label}</Label>
        <Select
          classNames={{
            control: () =>
              `text-xs !min-h-[1.7rem] text-white !rounded-none !shadow-none !border-t-0 !border-x-0 focus:!border-white !bg-transparent focus:!ring-0 ${isTouched && hasError ? "!border-red-600" : "border-white"}`,
            valueContainer: () => "!p-0",
            dropdownIndicator: () => "!p-0",
            singleValue: () => "!text-gray !mx-0",
            menuList: () => "!text-xs",
            multiValue: () => "!bg-accent",
            multiValueLabel: () => "!text-white",
            multiValueRemove: () => "hover:!text-red-500 hover:!bg-accent",
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
          isSearchable={false}
          classNamePrefix="select"
          placeholder={placeholder}
          name={name}
          options={options}
          isMulti={isMulti}
          onChange={handleChange}
        />

        {isTouched && hasError && (
          <p className="mt-2 text-xs italic text-red-600">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default DropwDown;
