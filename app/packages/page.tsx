import React from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Hero from "@/components/shared/hero";
import Venues from "@/components/shared/venues";
import PackagesList from "@/components/packages-list";
import AdditionalFeatures from "@/components/addtional-services";
import VenueDetail from "@/components/venue/venue-detail";
import { REDIRECT_URL } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affordable Wedding Venue Packages in Manville, NJ | Manville Manor",
  description:
    "Discover our affordable wedding and event packages. Manville Manor offers customizable packages for weddings, corporate retreats (with full AV equipment), and social events - providing exceptional value, modern amenities, and flexibility to suit your budget.",
  alternates: {
    canonical: `${REDIRECT_URL}/packages`,
  },
};

const Packages = () => {
  return (
    <>
      <Hero heroImage={HeaderImage} heroHeading="Packages" />

      <div className="container my-10 md:my-20">
        <div className="flex w-full flex-col gap-12 md:flex-row">
          <Venues />

          <div className="flex-1">
            <VenueDetail />
            <PackagesList />
          </div>
        </div>
      </div>
      <AdditionalFeatures />
    </>
  );
};

export default Packages;
