"use client";
import { getFloorPlans } from "@/utils/api-calls";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BASE_URL } from "@/utils/contants";
import Spinner from "@/components/shared/spinner";

const FloorPlans = () => {
  const searchParams = useSearchParams();
  const selectedVenue = searchParams.get("venue");
  const [floorPlans, setfloorPlans] = useState([]);
  const [loading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      try {
        setisLoading(true);
        const plans = await getFloorPlans(false, selectedVenue);
        if (plans) {
          setfloorPlans(plans);
        }
      } catch (error) {
        console.error("error getting floor Plans");
      } finally {
        setisLoading(false);
      }
    };

    if (selectedVenue) {
      fetchFloorPlans();
    }
  }, [searchParams]);

  return (
    <div className="flex-1">
      <h2 className="mb-11 text-center text-3xl text-secondary lg:text-5xl">
        View Our Floor Plan options
      </h2>

      <div>
        {loading ? (
          <div className="py-36">
            <Spinner />
          </div>
        ) : floorPlans?.length > 0 ? (
          <div className="flex flex-col gap-14">
            {floorPlans?.map((plan: any) => (
              <div key={plan?.id} className="flex flex-col items-center gap-8">
                <p className=" bg-accent px-4 py-2 text-xl text-white">
                  {plan?.attributes?.name}
                </p>
                <Image
                  width={988}
                  height={700}
                  src={
                    BASE_URL +
                    plan?.attributes?.floorMedia?.data?.attributes?.url
                  }
                  alt={`${plan?.attributes?.name} - image`}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-2xl text-white">
            No Floor Plans Found
          </p>
        )}
      </div>
    </div>
  );
};

export default FloorPlans;
