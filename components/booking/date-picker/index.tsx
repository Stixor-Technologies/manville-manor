"use client";
import React, { FC } from "react";

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
  customError: string | null;
  setCustomError: (error: string | null) => void;
}

const DatePicker: FC<DatePickerProps> = ({
  placeholder,
  name,
  label,
  hasError,
  isTouched,
  errorMessage,
  customError,
  setCustomError,
}) => {
  const { setFieldValue } = useFormikContext<FormValues>();
  // const [customError, setCustomError] = useState<string | null>(null);

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
        if (slotData?.slots) {
          const availableSlots = getAvailableSlots(slotData?.slots);

          const latestAvailableTime = availableSlots[availableSlots.length - 1];

          const selectedTime = selectedDate.format("HH:mm");
          // const selectedTime12Hrs = moment(selectedTime, "HH:mm").format(
          //   "hh:mm A",
          // );

          if (
            moment(selectedTime, "hh:mm A").isAfter(
              moment(latestAvailableTime, "hh:mm A"),
            )
          ) {
            setCustomError(
              `The selected time is beyond the allowed time range. The latest available time is ${moment(latestAvailableTime, "HH:mm").format("hh:mm A")}. Please choose a time before this.`,
            );
            return;
          }

          if (!availableSlots.includes(selectedTime)) {
            setCustomError(
              `The selected time slot is not available. Please choose another time from the available slots: ${availableSlots
                ?.map((slot) => moment(slot, "HH:mm").format("hh:mm A"))
                ?.join(", ")}.`,
            );
            return;
          }
        } else {
          setCustomError("No slots available for the selected date.");
        }
      } catch (error) {}
    }
  };

  const inputProps = {
    placeholder: `${placeholder}`,
    className: `w-full appearance-none border-b bg-transparent text-xs capitalize h-[1.7rem] text-gray outline-none cursor-pointer placeholder:text-gray ${isTouched && hasError ? "border-b-red-600" : "border-b-white"}`,
    readOnly: true,
  };

  return (
    <div className="relative w-full">
      <Label labelFor={name}>{label}</Label>

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
