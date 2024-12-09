import React from "react";
import {
  getPeopleCount,
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
    peopleCount,
    caterings,
    floorPlans,
    additonalServices,
    backDrops,
    packages,
  ] = await Promise.all([
    getVenues(),
    getPeopleCount(),
    getCatering(),
    getFloorPlans(true),
    getAdditionalServices(true),
    getBackdrops(true),
    getPackages(true),
  ]);

  return (
    <BookingForm
      venues={venues}
      peopleCount={peopleCount}
      floorPlans={floorPlans}
      services={additonalServices}
      catering={caterings}
      backDrops={backDrops}
      packages={packages}
    />
  );
};

export default BookingWrapper;
