import React, { FC } from "react";
import { PackageCard } from "../package-card";
import SectionHeader from "../shared/section-header";
import { venuePackage, decorPackage } from "@/utils/utils";

interface EventPackages {
  fromHome?: boolean;
}

const EventPackages: FC<EventPackages> = ({ fromHome }) => {
  return (
    <div className="my-10">
      {fromHome ? (
        <SectionHeader header="Pricing" description="Event Packages" />
      ) : (
        <h2 className="text-center text-5xl text-secondary">
          Best Plans For Events
        </h2>
      )}

      <div className="mt-16 flex justify-center gap-9">
        <PackageCard variant={"decor"} eventPackage={venuePackage}>
          <h2 className="text-[1.375rem] font-semibold leading-none tracking-wider text-white">
            Venue Only <br />{" "}
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']">
              P
            </span>
            ackage
          </h2>
        </PackageCard>
        <PackageCard eventPackage={decorPackage}>
          <h2 className="text-[1.375rem] font-semibold leading-none tracking-wider text-white">
            Venue & <br />{" "}
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']">
              D
            </span>
            ecor Package
          </h2>
        </PackageCard>
      </div>
    </div>
  );
};

export default EventPackages;
