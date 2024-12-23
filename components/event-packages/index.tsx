import React from "react";
import SectionHeader from "../shared/section-header";
import {
  getAdditionalServices,
  getBackdrops,
  getPackages,
} from "@/utils/api-calls";
import PackagesList from "./packages-list";
import { Backdrops, EventPackagesType } from "@/utils/types/types";

const EventPackages = async () => {
  const packages: EventPackagesType[] = await getPackages();
  const backdrops: Backdrops[] = await getBackdrops();
  const additonalServices = await getAdditionalServices();

  return (
    <div>
      {packages?.length > 0 && (
        <div data-animated-package-card>
          <SectionHeader header="Pricing" description="Event Packages" />
          <PackagesList
            packages={packages}
            fromHome
            backdrops={backdrops}
            additonalServices={additonalServices}
          />
        </div>
      )}
    </div>
  );
};

export default EventPackages;
