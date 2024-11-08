"use client";
import React, { FC, useState } from "react";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { checkSlotAvailability } from "@/utils/api-calls";

import Label from "../label";
import { useFormikContext } from "formik";
import moment, { Moment } from "moment";
import { FormValues } from "@/utils/types/types";

interface DatePickerProps {
  placeholder: string;
  name: string;
  label: string;
  hasError?: boolean;
  isTouched?: boolean;
  errorMessage?: string;
}

const DatePicker: FC<DatePickerProps> = ({
  placeholder,
  name,
  label,
  hasError,
  isTouched,
  errorMessage,
}) => {
  const { setFieldValue } = useFormikContext<FormValues>();
  const [customError, setCustomError] = useState<string | null>(null);

  // for disabling past dates
  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current: Moment) => {
    return current.isAfter(yesterday);
  };

  const getAvailableSlots = (
    slots: Array<{ time: string; available: boolean }>,
  ) => {
    return slots?.filter((slot) => slot?.available)?.map((slot) => slot?.time);
  };

  const handleDateSelection = async (dateValue: any) => {
    if (dateValue) {
      const selectedDate = moment(dateValue);
      const formattedDate = selectedDate?.toDate()?.toISOString();
      setFieldValue(name, formattedDate);
      const date = selectedDate?.format("MM-DD-YYYY");

      try {
        setCustomError(null);
        const slotData = await checkSlotAvailability(date);
        console.log(slotData?.slots);
        if (slotData?.slots) {
          const availableSlots = getAvailableSlots(slotData.slots);
          const selectedTime = selectedDate.format("HH:mm");

          if (!availableSlots.includes(selectedTime)) {
            setCustomError(
              "The selected time slot is not available. Please choose another time.",
            );
            return;
          }
        } else {
          setCustomError("No slots available for the selected date.");
        }
      } catch (error) {
        console.error("error fethcing time slots");
      }
    }
  };

  const inputProps = {
    placeholder: `${placeholder}`,
    className: `w-full appearance-none border-b bg-transparent text-xs capitalize h-[1.7rem] text-gray outline-none cursor-pointer placeholder:text-gray ${isTouched && hasError ? "border-b-red-600" : "border-b-white"}`,
    readOnly: true,
  };

  return (
    <div className="relative w-full">
      <Label labelFor={name}> {label}</Label>

      <Datetime
        inputProps={inputProps}
        closeOnSelect
        isValidDate={disablePastDt}
        onClose={handleDateSelection}
        timeConstraints={{
          minutes: { min: 0, max: 0, step: 1 },
        }}
      />

      {(isTouched && hasError && (
        <p className="mt-2 text-xs italic text-red-600">{errorMessage}</p>
      )) ||
        (customError && (
          <p className="mt-2 text-xs italic text-red-600">{customError}</p>
        ))}
    </div>
  );
};

export default DatePicker;
