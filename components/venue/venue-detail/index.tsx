"use client";
import Spinner from "@/components/shared/spinner";
import { getVenues } from "@/utils/api-calls";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VenueDetail = () => {
  const searchParams = useSearchParams();
  const selectedVenue = searchParams.get("venue");
  const [venueDetail, setVenueDetail] = useState();
  const [loading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setisLoading(true);
        const venues = await getVenues(false, selectedVenue);
        if (venues) {
          setVenueDetail(venues?.[0]);
        }
      } catch (error) {
        console.error("error getting venues", error);
      } finally {
        setisLoading(false);
      }
    };

    if (selectedVenue) {
      fetchVenues();
    }
  }, [searchParams]);

  return (
    <div className="flex-1">
      <div className="mb-10 flex flex-col items-center gap-4">
        <h2 className="text-secondary">Venue</h2>

        <h3 className=" font-cormorant text-5xl text-white">Venue Details</h3>

        <p className="text-center text-[22px] text-secondary">
          Manville Manor Amenities - Modern Functionality, amusement, and
          entertainment
        </p>
      </div>

      {loading ? (
        <div className="flex-1 py-36">
          <Spinner />
        </div>
      ) : venueDetail ? (
        <div className="mx-auto grid grid-cols-1 place-items-center gap-9 md:grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] md:place-items-stretch">
          <div className="w-full max-w-[374px] bg-accent px-5 py-8">
            <h2 className="mb-11 text-center text-[1.375rem] font-semibold text-white">
              Amenities
            </h2>

            {venueDetail?.attributes?.amenities?.map(
              (amenity: any, index: number) => (
                <div
                  key={amenity.id}
                  className="mb-4 flex flex-1 items-center gap-5"
                >
                  <div
                    className={`group relative flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs `}
                  >
                    <span>{index + 1}</span>
                  </div>

                  <span className="flex-1 text-lg text-white">
                    {amenity?.item}
                  </span>
                </div>
              ),
            )}
          </div>

          <div className="w-full max-w-[374px] bg-accent px-4 py-8">
            <h2 className="mb-11 text-center text-[1.375rem] font-semibold text-white">
              Complimentary
            </h2>
            {venueDetail?.attributes?.complimentary?.map(
              (complimentary: any, index: number) => (
                <div
                  key={complimentary.id}
                  className="mb-4 flex flex-1 items-center gap-5"
                >
                  <div
                    className={`group relative flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs `}
                  >
                    <span>{index + 1}</span>
                  </div>

                  <span className="flex-1 text-lg text-white">
                    {complimentary?.item}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      ) : (
        <p className="flex-1 py-20 text-center text-2xl text-white">
          Venue Detail Not Found
        </p>
      )}
    </div>
  );
};

export default VenueDetail;
