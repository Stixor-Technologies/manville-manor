"use client";
import React, { FC, useEffect, useRef, useState } from "react";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

import Image from "next/image";
import SwiperButtons from "@/components/shared/swiper-buttons";
import { cn } from "@/lib/utils";
import Slide1 from "@/public/assets/gallery/slide-1.png";

interface MediaCarouselProps {
  venues: any;
}

const MediaCarousel: FC<MediaCarouselProps> = ({ venues }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [windowSize, setWindowSize] = useState<number>(0);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
    <>
      <div className="md:hidden">
        <SwiperButtons
          swiperRef={swiperRef}
          nextSlide={nextSlide}
          previousSlide={previousSlide}
        />
      </div>

      <div className="relative max-w-[51.5rem] overflow-hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          speed={500}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          onInit={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            480: {
              slidesPerView: "auto",
            },

            1280: {
              slidesPerView: 2,
            },
          }}
          className="media-swiper"
        >
          {venues.map((venue: any, index: number) => (
            <SwiperSlide
              key={index}
              className={cn(
                "max-w-[25rem] !overflow-hidden",

                index === 0 && "md:pre-transition-slide",
              )}
            >
              <div className="slide-content group relative flex cursor-pointer justify-center md:h-full md:w-[25rem]">
                <Image
                  src={venue?.asset}
                  alt=""
                  className="md:absolute md:object-cover"
                  fill={windowSize >= 768}
                />

                <div className="absolute bottom-0 w-[90%] rounded-sm bg-accent px-4 py-2.5 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-8 group-hover:opacity-100">
                  <p>{venue?.venueName}</p>
                  <p>{venue?.venueNumber}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-0 left-[calc(397px-8rem)] z-10 hidden md:block">
          <SwiperButtons
            swiperRef={swiperRef}
            nextSlide={nextSlide}
            previousSlide={previousSlide}
          />
        </div>
      </div>
    </>
  );
};

export default MediaCarousel;
