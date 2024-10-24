import React from "react";
import Hero from "@/components/shared/hero";
import AboutHero from "@/public/assets/about/about-hero.png";
import GallerySlider from "@/components/gallery/gallery-slider/page";
import EssentialMetrics from "@/components/gallery/essential-metrics/essential-metrics";

const Gallery = () => {
  return (
    <>
      <Hero heroImage={AboutHero} heroHeading="Gallery" />
      <div className="container px-8 lg:px-16 xl:px-[8.125rem]">
        <EssentialMetrics />
      </div>
      {/* <GallerySlider /> */}
    </>
  );
};

export default Gallery;
