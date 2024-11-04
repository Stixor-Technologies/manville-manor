import React from "react";
import MediaCarousel from "../media-carousel";
import Slide1 from "@/public/assets/gallery/slide-1.png";
import Slide2 from "@/public/assets/gallery/slide-2.png";
import Slide3 from "@/public/assets/gallery/slide-3.png";
import Slide4 from "@/public/assets/gallery/slide-4.png";
import Slide5 from "@/public/assets/gallery/slide-5.png";

const BackDrops = () => {
  const venues = [
    {
      asset: Slide1,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
    },
    {
      asset: Slide2,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
    },
    {
      asset: Slide3,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
    },
    {
      asset: Slide4,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
    },
    {
      asset: Slide5,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
    },
  ];

  return (
    <section className="container my-12 sm:px-[2.5625rem] md:my-24">
      <div className="flex flex-col justify-between gap-11 md:flex-row md:gap-8 lg:gap-16 2xl:gap-0">
        <div className="text-center md:max-w-[25.75rem] md:text-left">
          <h4 className="text-xl text-secondary">Our Backdrops</h4>
          <h2 className="mt-4 font-cormorant text-5xl text-white">
            Stunning Backdrops for Unforgettable Events
          </h2>
        </div>

        <MediaCarousel venues={venues} />
      </div>
    </section>
  );
};

export default BackDrops;
