"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SwiperButtons from "@/components/shared/swiper-buttons";
import { BASE_URL } from "@/utils/contants";

interface GallerySliderProps {
  sliderImages: {
    attributes: {
      url: string;
    };
  }[];
}

const GallerySlider: FC<GallerySliderProps> = ({ sliderImages }) => {
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

  return (
    <section className=" mx-auto max-w-[96rem]">
      <Swiper
        modules={[Navigation]}
        slidesPerView={windowSize < 640 ? 1.3 : "auto"}
        spaceBetween={20}
        centeredSlides={windowSize < 640 ? true : false}
        freeMode={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {sliderImages?.map((slide, index) => {
          return (
            <SwiperSlide
              key={index}
              className="last:mr-0 sm:max-w-[18.3125rem]"
            >
              <div className="relative aspect-[293/358] overflow-hidden">
                <Image
                  src={BASE_URL + slide?.attributes?.url}
                  alt={`gallery-slide-${index}`}
                  fill
                  className="w-full object-cover"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="mt-11">
        <SwiperButtons
          swiperRef={swiperRef}
          nextSlide={() => {
            swiperRef.current?.slideNext();
          }}
          previousSlide={() => {
            swiperRef.current?.slidePrev();
          }}
        />
      </div>
    </section>
  );
};

export default GallerySlider;
