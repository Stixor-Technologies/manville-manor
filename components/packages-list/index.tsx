"use client";
import { PackageCard } from "@/components/package-card";
import { cn } from "@/lib/utils";
import { Backdrops, EventPackagesType } from "@/utils/types/types";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPackages } from "@/utils/api-calls";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/shared/spinner";
import SectionHeader from "../shared/section-header";

gsap.registerPlugin(ScrollTrigger);

const PackagesList = () => {
  const packagesContainer = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const selectedVenue = searchParams.get("venue");

  const [packages, setPackages] = useState([]);
  const [loading, setisLoading] = useState<boolean>(true);

  // useGSAP(() => {
  //   const packageSection = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "[data-animated-package-card]",
  //       start: "top 85%",
  //       markers: true,
  //     },
  //   });

  //   packageSection.from(
  //     packagesContainer?.current,
  //     {
  //       opacity: 0,
  //       y: 50,
  //       duration: 0.8,
  //       ease: "power1",
  //     },
  //     0.3,
  //   );
  // }, [packages]);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      try {
        setisLoading(true);
        const plans = await getPackages(false, selectedVenue);
        if (plans) {
          setPackages(plans);
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

  console.log("packages", packages);

  return (
    <div data-animated-package-card className="flex-1">
      <SectionHeader header="Pricing" description="Event Packages" />

      {loading ? (
        <div className="py-36">
          <Spinner />
        </div>
      ) : packages?.length > 0 ? (
        <div
          ref={packagesContainer}
          className={cn(
            "mx-auto mt-10 grid grid-cols-1 place-items-center gap-9 md:mt-20 md:grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] md:place-items-stretch",
          )}
        >
          {packages?.map((eventPackage: any, index) => (
            <PackageCard
              key={eventPackage?.id}
              variant={index % 2 === 0 ? "decor" : "default"}
              eventPackage={eventPackage}
            />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-2xl text-white">
          No Package Found
        </p>
      )}
    </div>
  );
};

export default PackagesList;
