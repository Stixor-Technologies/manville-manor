import React from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";

import Image from "next/image";

const HomeHero = () => {
  return (
    <section className="mb-10 mt-12">
      {/* text-section */}

      <div className="container sm:px-[2.5625rem]">
        <div className="mx-auto mb-8 flex max-w-[43.75rem] flex-col items-center justify-between text-center lg:mb-4 lg:max-w-none lg:flex-row lg:items-start lg:gap-16 lg:text-left">
          <h1 className="w-full font-cormorant text-5xl leading-none text-white md:text-[4rem] lg:max-w-[631px] lg:leading-tight">
            Create Unforgettable Moments at Manville Manor
          </h1>

          <p className="mt-6 text-[1.375rem] text-secondary lg:mt-0 lg:max-w-[453px]">
            From intimate gatherings to grand celebrations, Manville Manor
            offers the perfect space to make your event truly memorable.
          </p>
        </div>
      </div>

      {/* image section */}
      <div className="relative flex justify-center">
        <Image src={HeaderImage} alt="hero-image" />
        {/* <span className="absolute bottom-[0.5vw] text-[clamp(0.5rem,2vw,1.375rem)] uppercase tracking-wider text-white">
          View Our Packages
        </span> */}
      </div>
    </section>
  );
};

export default HomeHero;
