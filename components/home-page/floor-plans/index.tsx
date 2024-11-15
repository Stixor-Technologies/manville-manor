import React from "react";

import { Button } from "@/components/button";
import { getFloorPlans } from "@/utils/api-calls";
import FloorSlider from "./slider";

const FloorPlans = async () => {
  const floorPlans = await getFloorPlans();

  return (
    <section className="container overflow-hidden py-12 sm:px-[2.5625rem] md:py-24">
      <div className="flex flex-col justify-between gap-11 md:flex-row md:gap-8 lg:gap-16 2xl:gap-0">
        <div className="text-center md:max-w-[25.75rem] md:text-left">
          <h4 className="text-xl text-secondary">Floor Plans</h4>
          <h2 className="my-4 text-5xl text-white">
            Let&apos;s View Our Floor Plans
          </h2>
          <p className="text-[1.375rem] text-secondary">
            Let&apos;s view our floor plans and discover versatile layouts
            tailored to suit any event, from intimate gatherings to grand
            celebrations. Find the perfect setup to bring your vision to life!
          </p>
          <Button className="hidden w-[12.75rem] md:mt-4 md:block lg:mt-14">
            Design Your Event
          </Button>
        </div>

        <>
          <FloorSlider floorPlans={floorPlans} />
        </>
        <Button className="mx-auto w-[12.75rem] md:hidden lg:mt-14">
          Design Your Event
        </Button>
      </div>
    </section>
  );
};

export default FloorPlans;
