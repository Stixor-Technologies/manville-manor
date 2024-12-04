"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Slide1 from "@/public/assets/gallery/slide-1.png";
import Slide2 from "@/public/assets/gallery/slide-2.png";
import Slide3 from "@/public/assets/gallery/slide-3.png";
import Slide4 from "@/public/assets/gallery/slide-4.png";
import Slide5 from "@/public/assets/gallery/slide-5.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SwiperButtons from "@/components/shared/swiper-buttons";

const GallerySlider = () => {
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
    <section className="mx-auto max-w-[96rem]">
      <Swiper
        modules={[Navigation]}
        slidesPerView={windowSize < 400 ? 1.3 : "auto"}
        spaceBetween={20}
        centeredSlides={windowSize < 400 ? true : false}
        freeMode={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {[Slide1, Slide2, Slide3, Slide4, Slide5, Slide1, Slide2, Slide3].map(
          (slide, index) => (
            <SwiperSlide
              key={index}
              className="last:mr-0 sm:max-w-[18.3125rem]"
            >
              <Image src={slide} alt={`gallery-slide-${index}`} />
            </SwiperSlide>
          ),
        )}
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
