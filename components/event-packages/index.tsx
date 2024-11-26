import React from "react";
import SectionHeader from "../shared/section-header";
import { getPackages } from "@/utils/api-calls";
import PackagesList from "./packages-list";
import { EventPackagesType } from "@/utils/types/types";

const EventPackages = async () => {
  const packages: EventPackagesType[] = await getPackages();

  return (
    <div>
      {packages?.length > 0 && (
        <div data-animated-package-card>
          <SectionHeader header="Pricing" description="Event Packages" />
          <PackagesList packages={packages} fromHome />
        </div>
      )}
    </div>
  );
};

export default EventPackages;
