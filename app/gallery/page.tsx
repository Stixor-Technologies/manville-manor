import React from "react";
import Hero from "@/components/shared/hero";
import Image from "next/image";
import HeroGallery from "@/public/assets/gallery/hero-gallery.png";
// import GallerySlider from "@/components/gallery/gallery-slider/page";
// import EssentialMetrics from "@/components/gallery/essential-metrics/essential-metrics";
import ArrowDown from "@/public/assets/icons/point-down.svg";
import GalleryHighLight from "@/components/gallery/gallery-highlight";
import GalleryPortfolio from "@/components/gallery/gallery-portfolio";
import { getPortfolio } from "@/utils/api-calls";
import { REDIRECT_URL } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Manville Manor - Wedding & Event Photos",
  description:
    "Browse the Manville Manor gallery to see photos of our timelessly elegant event spaces in action. View images of beautiful weddings, outdoor ceremonies, corporate events, and special occasions hosted at our Manville, NJ venue.",
  alternates: {
    canonical: `${REDIRECT_URL}/gallery`,
  },
};

const Gallery = async () => {
  // const sliderData = await getGallerySliderImages();
  const portfolio = await getPortfolio();

  return (
    <>
      <div className="overflow-hidden">
        <Hero heroImage={HeroGallery} heroHeading="Gallery" />
        <div className="container">
          <div className="mt-11 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="relative flex justify-center md:justify-start">
              <h3 className="text-5xl text-white">
                Our <br className="hidden md:block" /> Speciality
              </h3>
              <Image
                src={ArrowDown}
                alt="arrow-down"
                className="absolute -right-10 top-full hidden -translate-y-[35%] animate-float md:block"
              />
            </div>

            <p className="text-center text-xl capitalize leading-relaxed text-secondary md:w-[50%] md:max-w-[32rem] md:text-left lg:w-full">
              At Manville Manor, we believe every event should be extraordinary.
              Whether you&apos;re planning a wedding, corporate gathering,
              social celebration, or private party, our dedication to excellence
              ensures your vision becomes reality. We pride ourselves on
              attention to detail, professional service, and creating an
              atmosphere where lasting memories are made
            </p>
          </div>

          {/* <EssentialMetrics /> */}
        </div>
        {/* {sliderData?.attributes?.images?.data && (
          <GallerySlider sliderImages={sliderData?.attributes?.images?.data} />
        )} */}

        {portfolio?.length > 0 && <GalleryPortfolio portfolio={portfolio} />}

        <GalleryHighLight />
      </div>
    </>
  );
};

export default Gallery;
