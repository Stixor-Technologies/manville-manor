"use client";
import React, { FC, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import SwiperButtons from "@/components/shared/swiper-buttons";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { BASE_URL } from "@/utils/contants";
import { cn } from "@/lib/utils";

interface FloorSliderProps {
  floorPlans: any[];
}

const FloorSlider: FC<FloorSliderProps> = ({ floorPlans }) => {
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
        className="floor-swiper relative"
      >
        {floorPlans?.map((floorPlan: any, index: number) => (
          <SwiperSlide key={index} className={cn("!overflow-hidden")}>
            <div
              className={cn(
                "relative flex  aspect-[475/487] w-full cursor-pointer justify-center  xl:aspect-auto xl:h-[411px] xl:w-[400px]",
              )}
            >
              <Image
                src={`${BASE_URL}${floorPlan?.attributes?.floorMedia?.data?.attributes?.url}`}
                alt={floorPlan?.attributes?.name}
                className="absolute rounded-sm object-cover"
                fill
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 md:bottom-0 md:left-auto md:right-0 md:block md:-translate-x-0 xl:right-[7%] xl:top-0">
          <SwiperButtons
            swiperRef={swiperRef}
            nextSlide={nextSlide}
            previousSlide={previousSlide}
            fromPlans
          />
        </div>
      </Swiper>
    </div>
  );
};

export default FloorSlider;
