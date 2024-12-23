"use client";
import React, { FC, useRef } from "react";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

import Image from "next/image";
import SwiperButtons from "@/components/shared/swiper-buttons";
import { cn } from "@/lib/utils";
// import Link from "next/link";
// import Instagram from "@/public/assets/icons/instagram.svg";
// import Facebook from "@/public/assets/icons/facebook.svg";
import { BASE_URL } from "@/utils/contants";
// import { Backdrops } from "@/utils/types/types";
// import backdrops from "../backdrops";

interface MediaCarouselProps {
  data: any[];
  // showSocial?: boolean;
}

const MediaCarousel: FC<MediaCarouselProps> = ({ data }) => {
  console.log("backdrops", data);
  const swiperRef = useRef<SwiperClass | null>(null);

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

      <div className="relative overflow-hidden md:max-w-[25rem] lg:max-w-[31.25rem] xl:max-w-[51.5rem]">
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
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
          className="media-swiper"
        >
          {data?.map((item, index) => (
            <SwiperSlide
              key={index}
              className={cn(
                "!overflow-hidden xl:max-w-[25rem]",

                index === 0 && "md:pre-transition-slide",
              )}
            >
              <div className="slide-content group relative flex aspect-[400/500] cursor-pointer  justify-center md:aspect-[400/400] md:h-full xl:aspect-auto xl:w-[25rem]">
                <Image
                  src={BASE_URL + item?.attributes?.url}
                  alt={item?.attributes?.name}
                  className="absolute rounded-sm object-cover"
                  fill
                />

                <div className="absolute bottom-0 flex w-[90%] items-end gap-3 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-8 group-hover:opacity-100 sm:w-[80%] sm:gap-8">
                  {/* <div className="flex-1 rounded-sm bg-accent px-4 py-2.5 text-white">
                    <p>{item?.attributes?.name}</p>
                    <p>{item?.attributes?.tag}</p>
                  </div> */}

                  {/* We May remove this */}

                  {/* {showSocial && item.attributes?.social && (
                    <div className="flex flex-col items-center bg-accent">
                      <Link
                        href={backdrop?.attributes.social?.facebook}
                        className="mb-3 inline-block p-3"
                      >
                        <Image src={Facebook} alt="facebook-icon" />
                      </Link>
                      <Link
                        href={backdrop?.attributes?.social?.facebook}
                        className="inline-block bg-white/30 p-3"
                      >
                        <Image src={Instagram} alt="instagram-icon" />
                      </Link>
                    </div>
                  )} */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-0 right-0 z-10 hidden md:block xl:left-[calc(397px-8rem)] xl:right-auto">
          <SwiperButtons
            swiperRef={swiperRef}
            nextSlide={nextSlide}
            previousSlide={previousSlide}
            fromPlans
          />
        </div>
      </div>
    </>
  );
};

export default MediaCarousel;
