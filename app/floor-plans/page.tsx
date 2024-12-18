import React from "react";
import HeroFaq from "@/public/assets/faq-hero.jpg";
import Hero from "@/components/shared/hero";
import Venues from "@/components/shared/venues";
import FloorPlans from "@/components/floor-plans/floors-list";

const FloorPlansPage = async () => {
  return (
    <>
      <Hero heroImage={HeroFaq} heroHeading="" />

      <div className="container my-10 md:my-20">
        <div className="flex w-full flex-col gap-12 md:flex-row">
          <Venues />
          <FloorPlans />
        </div>
      </div>
    </>
  );
};

export default FloorPlansPage;
