"use client";
import { PackageCard } from "@/components/package-card";
import { cn } from "@/lib/utils";
import { EventPackagesType } from "@/utils/types/types";
import React, { FC } from "react";

interface PackagesListProps {
  packages: EventPackagesType[];
  fromHome: boolean;
}

const PackagesList: FC<PackagesListProps> = ({ packages, fromHome }) => {
  return (
    <div
      data-animated-package-card
      className={cn(
        "flex flex-col items-center justify-center gap-9 md:flex-row",
        fromHome ? "mt-[5.4375rem]" : "mt-[4.25rem]",
      )}
    >
      {packages?.map((eventPackage) => (
        <PackageCard
          key={eventPackage?.id}
          variant={"decor"}
          eventPackage={eventPackage}
        >
          {/* <h2 className="relative max-w-[145px] text-lg font-semibold leading-none tracking-wider text-white xs:text-[1.375rem]">
            {eventPackage?.attributes.name}

            <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']" />
          </h2> */}
        </PackageCard>
      ))}
      {/* <PackageCard variant={"decor"} eventPackage={venuePackage}>
    <h2 className="text-lg font-semibold leading-none tracking-wider text-white xs:text-[1.375rem]">
      Venue Only <br />{" "}
      <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']">
        P
      </span>
      ackage
    </h2>
  </PackageCard>
  <PackageCard eventPackage={decorPackage}>
    <h2 className="text-lg font-semibold leading-none tracking-wider text-white xs:text-[1.375rem]">
      Venue & <br />{" "}
      <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']">
        D
      </span>
      ecor Package
    </h2>
  </PackageCard> */}
    </div>
  );
};

export default PackagesList;
