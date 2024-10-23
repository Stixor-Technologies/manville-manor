import React from "react";
import Hero from "@/components/shared/hero";
import AboutHero from "@/public/assets/about/about-hero.png";
import GallerySlider from "@/components/gallery/gallery-slider/page";

const Gallery = () => {
  return (
    <>
      <Hero heroImage={AboutHero} heroHeading="Gallery" />
      <GallerySlider />
    </>
  );
};

export default Gallery;
