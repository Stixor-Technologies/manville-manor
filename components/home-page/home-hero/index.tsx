import React from "react";
import HeroImage from "@/public/assets/home-hero.png";
import Image from "next/image";

const HomeHero = () => {
  return (
    <section className="mb-10">
      {/* text-section */}

      <div className="container sm:px-[2.5625rem]">
        <div className="mx-auto mb-8 flex max-w-[43.75rem] flex-col items-center justify-between text-center lg:mb-4 lg:max-w-none lg:flex-row lg:items-end lg:gap-16 lg:text-left">
          <div className="inline-block bg-accent/40 px-2 py-2.5 font-cormorant text-base text-white lg:hidden">
            BE DECORATIVE
          </div>

          <h2 className="w-full font-cormorant text-5xl leading-none text-white md:text-[4rem] lg:max-w-[631px] lg:leading-tight">
            Your Dream Start{" "}
            <div className="relative -top-3 hidden bg-accent/40 px-2 py-2.5 font-cormorant text-base lg:inline-block">
              BE DECORATIVE
            </div>{" "}
            Here At Manville Manor
          </h2>

          <p className="mt-6 text-[1.375rem] text-secondary lg:mt-0 lg:max-w-[453px]">
            From intimate gatherings to grand celebrations, Manville Manor
            offers the perfect space to make your event truly memorable.
          </p>
        </div>
      </div>

      {/* image section */}
      <div className="relative flex justify-center">
        <Image src={HeroImage} alt="hero-image" />
        <span className="absolute bottom-[0.5vw] text-[clamp(0.5rem,2vw,1.375rem)] uppercase tracking-wider text-white">
          View Our Packages
        </span>
      </div>
    </section>
  );
};

export default HomeHero;
