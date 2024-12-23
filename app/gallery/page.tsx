import React from "react";
import Hero from "@/components/shared/hero";
import Image from "next/image";
import HeroGallery from "@/public/assets/gallery/hero-gallery.png";
import GallerySlider from "@/components/gallery/gallery-slider/page";
import EssentialMetrics from "@/components/gallery/essential-metrics/essential-metrics";
import ArrowDown from "@/public/assets/icons/point-down.svg";
import GalleryHighLight from "@/components/gallery/gallery-highlight";
import GalleryPortfolio from "@/components/gallery/gallery-portfolio";
import {
  getGallerySliderImages,
  // getPorfolioFilters,
  getPortfolio,
} from "@/utils/api-calls";

const Gallery = async () => {
  const sliderData = await getGallerySliderImages();
  // const portfolioFilters = await getPorfolioFilters();
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
              Tincidunt sagittis mollis nec suspendisse sed felis massa urna
              nec. Urna quisque blandit turpis ultrices arcu ut sed. Ultricies
              diam est aliquet porta fermentum molestie morbi libero. Ultrices
              sit in elit eget nullam sem. Urna velit imperdiet habitant in.
            </p>
          </div>

          <EssentialMetrics />
        </div>
        {sliderData?.attributes?.images?.data && (
          <GallerySlider sliderImages={sliderData?.attributes?.images?.data} />
        )}

        {/* {portfolio?.attributes?.portfolioCategory?.length > 0 && (
          <GalleryPortfolio
            portfolio={portfolio?.attributes?.portfolioCategory}
            // portfolioFilters={portfolioFilters}
          />
        )} */}

        {portfolio?.length > 0 && (
          <GalleryPortfolio
            portfolio={portfolio}
            // portfolioFilters={portfolioFilters}
          />
        )}

        <GalleryHighLight />
      </div>
    </>
  );
};

export default Gallery;
