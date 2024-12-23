import React, { Suspense } from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Hero from "@/components/shared/hero";
import Venues from "@/components/shared/venues";
import FloorPlans from "@/components/floor-plans/floors-list";

const FloorPlansPage = async () => {
  return (
    <>
      <Hero heroImage={HeaderImage} heroHeading="" />

      <div className="container my-10 md:my-20">
        <div className="flex w-full flex-col gap-12 md:flex-row">
          <Venues />
          <Suspense>
            <FloorPlans />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default FloorPlansPage;
