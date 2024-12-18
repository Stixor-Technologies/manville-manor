import { getVenues } from "@/utils/api-calls";
import React from "react";
import VenueList from "./venue-list";

const Venues = async () => {
  const venueList = await getVenues(true);

  return (
    <>
      <VenueList venueList={venueList} />
    </>
  );
};

export default Venues;
