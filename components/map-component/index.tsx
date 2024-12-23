"use client";
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MAP_KEY } from "@/utils/contants";
import Spinner from "../shared/spinner";

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_KEY!,
  });

  const location = {
    lat: 40.54377582392924,
    lng: -74.58894737301489,
  };

  const mapOptions = {
    disableDefaultUI: false,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    scrollwheel: false,
    minZoom: 5,
    maxZoom: 40,
  };

  //   className={`sm:pb-1/2 relative h-[21.875rem] w-full md:order-1 md:h-auto md:flex-1`}

  return (
    <div
      className={`sm:pb-1/2 relative col-span-3 col-start-1 row-span-2 row-start-1  h-[25rem] overflow-hidden rounded-sm`}
    >
      {isLoaded ? (
        <GoogleMap
          id="google-map"
          zoom={18}
          center={location}
          options={mapOptions}
          mapContainerClassName="absolute top-0 left-0 h-full w-full"
        >
          <Marker position={location} />
        </GoogleMap>
      ) : (
        <div className="absolute left-0 top-0 flex h-full w-full items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default MapComponent;
