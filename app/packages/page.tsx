import React from "react";
import AboutHero from "@/public/assets/about/about-hero.png";
import Hero from "@/components/shared/hero";
import Venues from "@/components/shared/venues";
import PackagesList from "@/components/packages-list";
import AdditionalFeatures from "@/components/addtional-services";
const Packages = () => {
  return (
    <>
      <Hero heroImage={AboutHero} heroHeading="Packages" />

      <div className="container my-10 md:my-20">
        <div className="flex w-full flex-col gap-12 md:flex-row">
          <Venues />
          <PackagesList />
        </div>
      </div>
      <AdditionalFeatures />
    </>
  );
};

export default Packages;
