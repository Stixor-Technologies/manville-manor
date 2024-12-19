"use client";
import React, { FC, useState } from "react";
import { Formik, Form } from "formik";
import { BookingFormSchema } from "@/utils/formik-schema";
import Input from "../input";
import { Button } from "@/components/button";
import Select from "../select";
import DatePicker from "../date-picker";
import { createBooking, getFloorPlans, getPackages } from "@/utils/api-calls";
import { toast } from "react-toastify";
import { FormValues, ListItemOption } from "@/utils/types/types";
import { useRouter } from "next/navigation";
import Label from "../label";

interface BookingFormProps {
  venues: ListItemOption[];
  services: ListItemOption[];
  catering: ListItemOption[];
}

const BookingForm: FC<BookingFormProps> = ({ venues, services, catering }) => {
  const route = useRouter();
  const [bookignRequest, setBookingRequest] = useState<boolean>(false);
  const [customError, setCustomError] = useState<string | null>(null);
  const [packages, setPackages] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);

  const initialValues = {
    fullName: "",
    phone: "",
    email: "",
    date: "",
    venue: "",
    peopleCount: "",
    catering: "",
    floorOption: "",
    additionalServices: [0],
    package: "",
    message: "",
    adultsCount: null,
    childsCount: null,
  };

  const fetchVenueData = async (venueName: string) => {
    console.log(venueName);
    try {
      const packagesResp = await getPackages(true, venueName);
      const floorPlans = await getFloorPlans(true, venueName);

      setPackages(packagesResp);
      setFloorPlans(floorPlans);
    } catch (error) {
      console.log("error fetching package");
    } finally {
      setBookingRequest(false);
    }
  };

  const makeBooking = async (values: FormValues) => {
    const formData = {
      ...values,
      ...(values.additionalServices?.[0] === 0 && { additionalServices: [] }),
    };

    const totalPeople = (values.adultsCount ?? 0) + (values.childsCount ?? 0);
    if (totalPeople > 81) {
      toast.error("The total number of people cannot exceed 81.", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    if (customError) return;
    try {
      setBookingRequest(true);
      const resp = await createBooking(formData);
      toast.success("Booking request successfull", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      });

      route.push(`/invoice?bookingId=${resp?.newData?.id}`);
    } catch (error) {
      toast.error("Error creating booking, try again later", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      console.error("error", error);
    } finally {
      setBookingRequest(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={makeBooking}
      validationSchema={BookingFormSchema}
    >
      {({ errors, touched }) => {
        return (
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
                  options={venues}
                  placeholder={"Select Venue"}
                  name={"venue"}
                  label={"Select Venue"}
                  hasError={!!errors.venue}
                  isTouched={touched.venue}
                  errorMessage={errors.venue}
                  isVenue
                  fetchVenueData={fetchVenueData}
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

                <DatePicker
                  placeholder={"Check Availability"}
                  name={"date"}
                  label={"Desired Date"}
                  hasError={!!errors.date}
                  isTouched={touched.date}
                  errorMessage={errors.date}
                  customError={customError}
                  setCustomError={setCustomError}
                />

                <div className="">
                  <Label labelFor={""}> Amount Of People</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      variant={"underlineWithLabel"}
                      hasError={!!errors.adultsCount}
                      isTouched={touched.adultsCount}
                      name={"adultsCount"}
                      errorMessage={errors.adultsCount}
                      placeholder="Number of Adults"
                    />
                    <Input
                      type="number"
                      variant={"underlineWithLabel"}
                      hasError={!!errors.childsCount}
                      isTouched={touched.childsCount}
                      name={"childsCount"}
                      errorMessage={errors.childsCount}
                      placeholder="Number of Childs"
                    />
                  </div>
                </div>

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
                  listing="floor-plans"
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
        );
      }}
    </Formik>
  );
};

export default BookingForm;
