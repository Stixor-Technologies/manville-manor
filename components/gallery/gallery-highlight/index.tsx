import React from "react";
import Image from "next/image";
import Venue from "@/public/assets/gallery/venue.png";
import Venue2 from "@/public/assets/gallery/venue-2.png";
import HighlightCircle from "@/public/assets/gallery/highlight-circle.svg";

import Link from "next/link";

const GalleryHighLight = () => {
  return (
    <section className="mx-auto mb-[50vw] max-w-[96rem] md:!mb-11 xs:mb-40">
      {/* Why us section */}
      <div className="mb-10 flex flex-col gap-11 md:flex-row md:gap-6 lg:gap-9">
        <div className="relative mt-11 flex-1 text-center text-white md:order-1 md:mr-5 md:mt-8 md:text-left lg:mt-20">
          <h3 className="font-cormorant text-5xl">Why Us</h3>
          <p className="mt-11 text-xl capitalize leading-relaxed md:mt-5 lg:mt-8">
            We specialize in creating unforgettable events with versatile
            spaces, tailored layouts, and expert coordination. Whether it's a
            wedding, corporate event, or private celebration, our attention to
            detail ensures every moment shines. Let us turn your vision into
            reality with seamless planning and personalized service.
          </p>

          <Image
            src={Venue2}
            width={168}
            alt=""
            className="absolute -bottom-7 hidden md:right-0 md:block"
          />

          <Image
            src={HighlightCircle}
            alt=""
            className="absolute -bottom-28 -right-5 hidden md:block"
          />
        </div>

        <div className="relative w-full flex-1 overflow-hidden bg-accent/20 pb-8 pt-20 md:max-w-[39rem] md:pb-10 md:pt-28 lg:pt-44">
          <div className="mx-auto w-[80%] max-w-[302px] font-cormorant text-2xl text-white xs:w-full xs:text-5xl">
            <span className="block text-right">Venues By</span>
            <Image src={Venue} width={302} alt="" className="relative z-10" />
            <span className="-ml-5 -mt-3 block xs:-ml-11 xs:-mt-5">
              Manville
            </span>
          </div>

          <span className="ml-10 mt-12 block text-center text-secondary md:text-left">
            {new Date().getFullYear()}
          </span>

          <Image
            src={HighlightCircle}
            alt=""
            className="absolute -right-[10%] -top-[30%] md:-top-[10%] md:right-0 md:block"
          />
        </div>
      </div>

      {/* Event section */}
      <div className="relative md:py-7 xl:py-12">
        <picture>
          <source
            media="(min-width: 640px)"
            srcSet="/assets/gallery/event-spotlight.png"
          />
          <source srcSet="/assets/gallery/event-spotlight-mobile.png" />
          <img />
        </picture>

        <div className="lg absolute bottom-0 left-1/2 flex w-[90%] -translate-x-1/2 translate-y-1/2 flex-col justify-center gap-4 bg-accent/80 px-4 py-9 text-center text-white md:bottom-0 md:left-0 md:top-0 md:w-1/2 md:translate-x-0 md:translate-y-0 md:px-7 md:text-left xl:w-[54%] xl:px-14">
          <h3 className=" mx-auto max-w-48 text-[1.375rem] capitalize leading-tight md:mx-0 md:max-w-[590px] md:text-4xl md:uppercase lg:text-5xl lg:leading-none xl:text-[4rem]">
            We create an event <br /> that everyone will <br /> remember.
          </h3>
          <div className="uppercase lg:text-2xl xl:text-[28px]">
            <span>Contact us: </span>
            <Link href={"mailto:focus@gmail.com"}>focus@gmail.com</Link>
          </div>
          <div className="uppercase lg:text-2xl xl:text-[28px]">
            <span>Call us 24/7: </span>
            <Link href={"tel:669-508-6708"}>669-508-6708</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHighLight;
