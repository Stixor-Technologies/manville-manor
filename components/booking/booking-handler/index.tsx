// "use client";
import React, { useEffect } from "react";
import {
  getPeopleCount,
  getVenues,
  getCatering,
  getFloorPlans,
  getAdditionalServices,
  getBackdrops,
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
  ] = await Promise.all([
    getVenues(),
    getPeopleCount(),
    getCatering(),
    getFloorPlans(),
    getAdditionalServices(),
    getBackdrops(),
  ]);

  return (
    <BookingForm
      venues={venues}
      peopleCount={peopleCount}
      floorPlans={floorPlans}
      services={additonalServices}
      catering={caterings}
      backDrops={backDrops}
    />
  );
};

export default BookingWrapper;
