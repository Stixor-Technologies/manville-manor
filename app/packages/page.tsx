import React from "react";
import AboutHero from "@/public/assets/about/about-hero.png";
import Hero from "@/components/shared/hero";
import Faqs from "@/components/shared/faq";
import EventPackages from "@/components/event-packages";

const Packages = () => {
  return (
    <>
      <Hero heroImage={AboutHero} heroHeading="Packages" />
      <div className="container mb-[4.5625rem] mt-[2.0625rem] flex flex-col gap-[7.375rem] px-8 lg:px-16 xl:px-[8.125rem]">
        <EventPackages />
        <Faqs />
      </div>
    </>
  );
};

export default Packages;
