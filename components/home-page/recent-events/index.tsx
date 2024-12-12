import { getRecentEvents } from "@/utils/api-calls";
import React from "react";
import EventsGallery from "./events-gallery";

const RecentEvents = async () => {
  const recentEvents = await getRecentEvents();

  return (
    <>
      {recentEvents?.length > 0 && (
        <EventsGallery recentEvents={recentEvents} />
      )}
    </>
  );
};

export default RecentEvents;
