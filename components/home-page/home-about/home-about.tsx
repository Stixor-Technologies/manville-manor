import React from "react";
import MediaCarousel from "../media-carousel";
import { getAbout } from "@/utils/api-calls";

const HomeAbout = async () => {
  const aboutData = await getAbout();

  return (
    <>
      {aboutData?.length > 0 && (
        <section className="container py-12 sm:px-[2.5625rem] md:py-24">
          <div className="flex flex-col justify-between gap-11 md:flex-row md:gap-8 lg:gap-16 2xl:gap-0">
            <div className="text-center md:order-1 md:max-w-[25.75rem] md:text-left">
              <h4 className="text-xl text-secondary">About Us</h4>
              <h2 className="my-4 font-cormorant text-5xl text-white">
                A Timeless Venue for Unforgettable Events
              </h2>
              <p className="text-[1.375rem] text-secondary">
                A seamless experience, from planning to execution with a
                versatile space suitable for Baby showers, birthdays, bridal
                showers, weddings, corporate functions, pop-up shops, fitness
                classes, Photo booths, and private gatherings alike (Upto 81
                Guests)
              </p>
            </div>

            <MediaCarousel data={aboutData} />
          </div>
        </section>
      )}
    </>
  );
};

export default HomeAbout;
