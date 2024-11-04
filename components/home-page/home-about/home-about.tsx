import React from "react";
import Slide1 from "@/public/assets/gallery/slide-1.png";
import Slide2 from "@/public/assets/gallery/slide-2.png";
import Slide3 from "@/public/assets/gallery/slide-3.png";
import Slide4 from "@/public/assets/gallery/slide-4.png";
import Slide5 from "@/public/assets/gallery/slide-5.png";
import MediaCarousel from "../media-carousel";

const HomeAbout = () => {
  const venues = [
    {
      asset: Slide1,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
      social: {
        facebook: "/",
        instagram: "/",
      },
    },
    {
      asset: Slide2,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
      social: {
        facebook: "/",
        instagram: "/",
      },
    },
    {
      asset: Slide3,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
      social: {
        facebook: "/",
        instagram: "/",
      },
    },
    {
      asset: Slide4,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
      social: {
        facebook: "/",
        instagram: "/",
      },
    },
    {
      asset: Slide5,
      venueName: "Don Carlo Van Houten",
      venueNumber: "Venue 1",
      social: {
        facebook: "/",
        instagram: "/",
      },
    },
  ];

  return (
    <section className="container py-12 sm:px-[2.5625rem] md:py-24">
      <div className="flex flex-col justify-between gap-11 md:flex-row md:gap-8 lg:gap-16 2xl:gap-0">
        <div className="text-center md:order-1 md:max-w-[25.75rem] md:text-left">
          <h4 className="text-xl text-secondary">About Us</h4>
          <h2 className="my-4 font-cormorant text-5xl text-white">
            A Timeless Venue for Unforgettable Events
          </h2>
          <p className="text-[1.375rem] text-secondary">
            A seamless experience, from planning to execution with a versatile
            space suitable for weddings, corporate functions, and private
            gatherings alike
          </p>
        </div>

        <MediaCarousel venues={venues} showSocial />
      </div>
    </section>
  );
};

export default HomeAbout;
