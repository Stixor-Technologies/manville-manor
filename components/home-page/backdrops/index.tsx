import React from "react";
import MediaCarousel from "../media-carousel";
import { getBackdrops } from "@/utils/api-calls";
import { Backdrops } from "@/utils/types/types";

const BackDrops = async () => {
  const backDrops: Backdrops[] = await getBackdrops();

  return (
    <section className="container my-12 sm:px-[2.5625rem] md:my-24">
      <div className="flex flex-col justify-between gap-11 md:flex-row md:gap-8 lg:gap-16 2xl:gap-0">
        <div className="text-center md:max-w-[25.75rem] md:text-left">
          <h4 className="text-xl text-secondary">Our Backdrops</h4>
          <h2 className="mt-4 font-cormorant text-5xl text-white">
            Stunning Backdrops for Unforgettable Events
          </h2>
        </div>

        <MediaCarousel backdrops={backDrops} />
      </div>
    </section>
  );
};

export default BackDrops;
