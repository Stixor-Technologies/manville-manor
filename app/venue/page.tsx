import React from "react";
import HeroFaq from "@/public/assets/faq-hero.jpg";
import Hero from "@/components/shared/hero";
import Venues from "@/components/shared/venues";
import VenueDetail from "@/components/venue/venue-detail";

const VenuePage = () => {
  return (
    <>
      <Hero heroImage={HeroFaq} heroHeading="" />

      <div className="container my-10 md:my-20">
        <div className="flex w-full flex-col gap-12 md:flex-row">
          <Venues />
          <VenueDetail />
        </div>
      </div>
    </>
  );
};

export default VenuePage;
