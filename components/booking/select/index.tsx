import React, { FC } from "react";
import { useFormikContext } from "formik";
import Label from "../label";
import Select from "react-select";
import { FormValues, ListItemOption } from "@/utils/types/types";
// import Link from "next/link";
import { cn } from "@/lib/utils";

interface SelectOptions {
  options: ListItemOption[];
  placeholder: string;
  name: string;
  label: string;
  isMulti?: boolean;
  hasError?: boolean;
  isTouched?: boolean;
  errorMessage?: string;
  // listing?: string;
  isVenue?: boolean;
  fetchVenueData?: (venueName: string) => void; // Pass fetchVenueData as a prop
  disabled?: boolean;
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
  // listing,
  isVenue,
  fetchVenueData,
  disabled,
}) => {
  const { setFieldValue } = useFormikContext<FormValues>();

  const handleChange = (selectedOption: any) => {
    if (!isMulti) {
      setFieldValue(name, selectedOption?.value);

      if (isVenue && fetchVenueData) {
        fetchVenueData(selectedOption?.label);
      }
    } else {
      const selectedValues = selectedOption
        ? selectedOption.map((option: any) => option?.value)
        : [];
      setFieldValue(name, selectedValues);
    }
  };

  // const formatListing = (item: string) =>
  //   item
  //     .split("-")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");

  return (
    <>
      <div className={cn("relative w-full", disabled && "opacity-50")}>
        <div className="flex items-center justify-between">
          <Label labelFor={name}> {label}</Label>
          {disabled && (
            <p className="text-[.625rem] text-white">
              Please Select Venu first
            </p>
          )}
        </div>
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
          isDisabled={disabled}
        />

        {isTouched && hasError && (
          <p className="mt-2 text-xs italic text-red-600">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default DropwDown;
