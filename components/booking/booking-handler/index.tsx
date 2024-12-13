import React from "react";
import {
  getVenues,
  getCatering,
  getFloorPlans,
  getAdditionalServices,
  getBackdrops,
  getPackages,
} from "@/utils/api-calls";
import BookingForm from "../booking-form";

const BookingWrapper = async () => {
  const [
    venues,
    caterings,
    floorPlans,
    additonalServices,
    backDrops,
    packages,
  ] = await Promise.all([
    getVenues(),
    getCatering(),
    getFloorPlans(true),
    getAdditionalServices(true),
    getBackdrops(true),
    getPackages(true),
  ]);

  return (
    <BookingForm
      venues={venues}
      floorPlans={floorPlans}
      services={additonalServices}
      catering={caterings}
      backDrops={backDrops}
      packages={packages}
    />
  );
};

export default BookingWrapper;
