import React, { FC } from "react";
import { PackageCard } from "../package-card";
import SectionHeader from "../shared/section-header";
import { venuePackage, decorPackage } from "@/utils/utils";
import { cn } from "@/lib/utils";

interface EventPackages {
  fromHome?: boolean;
}

const EventPackages: FC<EventPackages> = ({ fromHome }) => {
  return (
    <>
      {fromHome ? (
        <SectionHeader header="Pricing" description="Event Packages" />
      ) : (
        <h2 className="text-center text-3xl text-secondary md:text-5xl">
          Best Plans For Events
        </h2>
      )}

      <div
        className={cn(
          "flex flex-col items-center justify-center gap-9 md:flex-row",
          fromHome ? "mt-[87px]" : "mt-[4.25rem]",
        )}
      >
        <PackageCard variant={"decor"} eventPackage={venuePackage}>
          <h2 className="xs:text-[1.375rem] text-lg font-semibold leading-none tracking-wider text-white">
            Venue Only <br />{" "}
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']">
              P
            </span>
            ackage
          </h2>
        </PackageCard>
        <PackageCard eventPackage={decorPackage}>
          <h2 className="xs:text-[1.375rem] text-lg font-semibold leading-none tracking-wider text-white">
            Venue & <br />{" "}
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']">
              D
            </span>
            ecor Package
          </h2>
        </PackageCard>
      </div>
    </>
  );
};

export default EventPackages;
