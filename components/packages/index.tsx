import React from "react";
import { PackageCard } from "../package-card";
import SectionHeader from "../shared/section-header";
import { venuePackage, decorPackage } from "@/utils/utils";

const Packages = () => {
  return (
    <div className="my-10">
      <SectionHeader header="Pricing" description="Event Packages" />

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

export default Packages;
