import React from "react";
import {
  getVenues,
  getCatering,
  getAdditionalServices,
} from "@/utils/api-calls";
import BookingForm from "../booking-form";

const BookingWrapper = async () => {
  const [venues, caterings, additonalServices] = await Promise.all([
    getVenues(true, null),
    getCatering(),
    getAdditionalServices(true),
  ]);

  return (
    <BookingForm
      venues={venues}
      services={additonalServices}
      catering={caterings}
    />
  );
};

export default BookingWrapper;
