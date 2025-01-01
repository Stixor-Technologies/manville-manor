import React from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Hero from "@/components/shared/hero";
import Venues from "@/components/shared/venues";
import PackagesList from "@/components/packages-list";
import AdditionalFeatures from "@/components/addtional-services";
import VenueDetail from "@/components/venue/venue-detail";
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
