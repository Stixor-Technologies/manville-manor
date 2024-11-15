"use client";
import SwiperButtons from "@/components/shared/swiper-buttons";
import React, { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import DummyFloorPlan from "@/public/assets/dummy-floor-plan.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

const venues = [
  {
    asset: DummyFloorPlan,
    venueName: "Don Carlo Van Houten",
    venueNumber: "Venue 1",
  },
  {
    asset: DummyFloorPlan,
    venueName: "Don Carlo Van Houten",
    venueNumber: "Venue 1",
  },
  {
    asset: DummyFloorPlan,
    venueName: "Don Carlo Van Houten",
    venueNumber: "Venue 1",
  },
  {
    asset: DummyFloorPlan,
    venueName: "Don Carlo Van Houten",
    venueNumber: "Venue 1",
  },
  {
    asset: DummyFloorPlan,
    venueName: "Don Carlo Van Houten",
    venueNumber: "Venue 1",
  },
];

const FloorPlans = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSlideChange = (swiper: SwiperClass) => {
    setTimeout(() => {
      const currentSlide = swiper.slides[swiper.activeIndex];
      if (currentSlide) currentSlide.classList.add("pre-transition-slide");
    }, 50);
  };

  const nextSlide = () => {
    swiperRef.current?.slideNext();

    setTimeout(() => {
      const currentSlide =
        swiperRef.current?.slides[swiperRef.current.activeIndex];
      if (currentSlide) {
        currentSlide.classList.add("pre-transition-slide");
      }
    }, 10);
  };

  const previousSlide = () => {
    swiperRef.current?.slidePrev();
    setTimeout(() => {
      const currentSlide =
        swiperRef.current?.slides[swiperRef.current.activeIndex];
      if (currentSlide) {
        currentSlide.classList.add("pre-transition-slide");
      }
    }, 10);
  };

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
          <div
            ref={containerRef}
            className="relative md:max-w-[25rem] lg:max-w-[500px] xl:max-w-[51.5rem]"
          >
            <Swiper
              modules={[Pagination]}
              spaceBetween={22}
              speed={500}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
              onInit={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                480: {
                  slidesPerView: 1,
                },

                1280: {
                  slidesPerView: 2,
                },
              }}
              className="floor-swiper"
            >
              {venues.map((venue: any, index: number) => (
                <SwiperSlide key={index} className={cn("!overflow-hidden ")}>
                  <div className={cn("slide-content h-full")}>
                    <Image
                      src={venue?.asset}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 md:bottom-0 md:left-auto md:right-0 md:block md:-translate-x-0 xl:right-[7%] xl:top-0">
              <SwiperButtons
                swiperRef={swiperRef}
                nextSlide={nextSlide}
                previousSlide={previousSlide}
                fromPlans
              />
            </div>
          </div>
        </>
        <Button className="mx-auto w-[12.75rem] md:hidden lg:mt-14">
          Design Your Event
        </Button>
      </div>
    </section>
  );
};

export default FloorPlans;
