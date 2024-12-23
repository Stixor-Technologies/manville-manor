import React from "react";
import AboutHero from "@/public/assets/about/about-hero.png";
import Hero from "@/components/shared/hero";
import EventPackages from "@/components/event-packages";
const Packages = () => {
  return (
    <>
      <Hero heroImage={AboutHero} heroHeading="Packages" />
      <div className="container my-12 md:my-[4.5625rem]">
        <EventPackages />
      </div>
    </>
  );
};

export default Packages;
