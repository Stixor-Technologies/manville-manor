"use client";
import React, { FC, useState } from "react";
import { Formik, Form } from "formik";
import { BookingFormSchema } from "@/utils/formik-schema";
import Input from "../input";
import { Button } from "@/components/button";
import Select from "../select";
import DatePicker from "../date-picker";
import { createBooking } from "@/utils/api-calls";
import { toast } from "react-toastify";
import { FormValues, ListItemOption } from "@/utils/types/types";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  venues: ListItemOption[];
  peopleCount: ListItemOption[];
  floorPlans: ListItemOption[];
  services: ListItemOption[];
  catering: ListItemOption[];
  backDrops: ListItemOption[];
}

const BookingForm: FC<BookingFormProps> = ({
  venues,
  peopleCount,
  floorPlans,
  services,
  catering,
  backDrops,
}) => {
  const route = useRouter();
  const [bookignRequest, setBookingRequest] = useState<boolean>(false);

  const routine = [
    { value: "am", label: "Am" },
    { value: "pm", label: "Pm" },
  ];

  const packages = [
    { value: "Venue Only Package", label: "Venue Only Package" },
    { value: "Venue & Decor Package", label: "Venue & Decor Package" },
  ];

  const initialValues = {
    fullName: "",
    phone: "",
    email: "",
    routine: "",
    date: "",
    venue: "",
    peopleCount: "",
    catering: "",
    floorOption: "",
    additionalServices: [0],
    backDrop: "",
    package: "",
    message: "",
  };

  const makeBooking = async (values: FormValues) => {
    const formData = {
      ...values,
      ...(values.additionalServices.length === 0 && { additionalServices: [] }),
    };

    try {
      setBookingRequest(true);
      const resp = await createBooking(formData);
      
      toast.success("Booking request successfull", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      route.push("/");
      setBookingRequest(false);
    } catch (error) {
     
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={makeBooking}
      validationSchema={BookingFormSchema}
    >
      {({ errors, touched }) => (
        <>
          <Form className="mx-auto mt-11 flex w-[92%] flex-col items-center gap-11 lg:mt-20 lg:gap-9">
            <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(12.625rem,_1fr))] gap-x-[clamp(2.75rem,8vw,7.125rem)] gap-y-11">
              <Input
                variant={"underlineWithLabel"}
                hasError={!!errors.fullName}
                isTouched={touched.fullName}
                name={"fullName"}
                label="Full Name"
                errorMessage={errors.fullName}
              />

              <Input
                variant={"underlineWithLabel"}
                hasError={!!errors.phone}
                isTouched={touched.phone}
                name={"phone"}
                label="Phone"
                errorMessage={errors.phone}
              />

              <Input
                variant={"underlineWithLabel"}
                hasError={!!errors.email}
                isTouched={touched.email}
                name={"email"}
                label="Email"
                errorMessage={errors.email}
              />

              <Select
                options={packages}
                placeholder={"Select Package"}
                name={"package"}
                label={"Package"}
                hasError={!!errors.package}
                isTouched={touched.package}
                errorMessage={errors.package}
              />

              <Select
                options={routine}
                placeholder={"Select routine"}
                name={"routine"}
                label={"Select Routine"}
                hasError={!!errors.routine}
                isTouched={touched.routine}
                errorMessage={errors.routine}
              />

              <DatePicker
                placeholder={"Check Availability"}
                name={"date"}
                label={"Desired Date"}
                hasError={!!errors.date}
                isTouched={touched.date}
                errorMessage={errors.date}
              />

              <Select
                options={venues}
                placeholder={"Select Event"}
                name={"venue"}
                label={"Select Venue"}
                hasError={!!errors.venue}
                isTouched={touched.venue}
                errorMessage={errors.venue}
              />

              <Select
                options={peopleCount}
                placeholder={"Select Number of Peoples"}
                name={"peopleCount"}
                label={"Amount Of People"}
                hasError={!!errors.peopleCount}
                isTouched={touched.peopleCount}
                errorMessage={errors.peopleCount}
              />

              <Select
                options={catering}
                placeholder={"Select Catering"}
                name={"catering"}
                label={"Catering"}
                hasError={!!errors.catering}
                isTouched={touched.catering}
                errorMessage={errors.catering}
              />

              <Select
                options={floorPlans}
                placeholder={"Select Floor Options"}
                name={"floorOption"}
                label={"Floor Options"}
                hasError={!!errors.floorOption}
                isTouched={touched.floorOption}
                errorMessage={errors.floorOption}
              />

              <Select
                options={backDrops}
                placeholder={"Select Drops"}
                name={"backDrop"}
                label={"Back Drops"}
                hasError={!!errors.backDrop}
                isTouched={touched.backDrop}
                errorMessage={errors.backDrop}
              />

              <Select
                options={services}
                placeholder={"Select Additional Services"}
                name={"additionalServices"}
                label={"Additional Services"}
                isMulti
              />

              <Input
                as="textarea"
                className="mt-8 resize-none"
                variant={"underlineWithLabel"}
                hasError={!!errors.message}
                isTouched={touched.message}
                errorMessage={errors.message}
                name={"message"}
                label="Message"
                placeholder="Write your message"
              />
            </div>

            <Button
              size={"lg"}
              loading={bookignRequest}
              disabled={bookignRequest}
              className="w-[10.0625rem] md:mb-5"
            >
              Book Now
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default BookingForm;
