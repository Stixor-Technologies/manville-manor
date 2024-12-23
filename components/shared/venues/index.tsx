import { getVenues } from "@/utils/api-calls";
import React, { Suspense } from "react";
import VenueList from "./venue-list";

const Venues = async () => {
  const venueList = await getVenues(true, null);

  return (
    <>
      <Suspense>
        <VenueList venueList={venueList} />
      </Suspense>
    </>
  );
};

export default Venues;
