"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DummyArticle from "@/public/assets/dummy-article.png";
import Arrow from "@/public/assets/icons/arrow-brown.svg";
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
import { Button } from "@/components/button";

const GallerySlider = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      handleSlideChange(swiperRef.current);
    }
  }, []);

  const handleSlideChange = (swiper: SwiperClass) => {
    const isPrevButtonDisabled = swiper.isBeginning;
    const isNextButtonDisabled = swiper.isEnd;

    console.log("isEnd", isNextButtonDisabled);

    setIsPrevButtonDisabled(isPrevButtonDisabled);
    setIsNextButtonDisabled(isNextButtonDisabled);
  };

  console.log("isnextdisabled", isNextButtonDisabled);

  return (
    <section>
      <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        freeMode={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        {[Slide1, Slide2, Slide3, Slide4, Slide5].map((slide, index) => (
          <SwiperSlide
            key={index}
            className="mr-[1.625rem] last:mr-0 sm:max-w-[18.3125rem]"
          >
            <Image src={slide} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Button
          disabled={isPrevButtonDisabled}
          variant={"icon"}
          size={"icon"}
          className="size-[1.375rem] justify-center rounded-full border border-accent hover:bg-accent disabled:opacity-60"
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
        >
          <Image
            src={Arrow}
            width={10}
            alt="previous-slide"
            className=" rotate-180"
          />
        </Button>

        <Button
          disabled={isNextButtonDisabled}
          variant={"icon"}
          size={"icon"}
          className="size-[1.375rem] justify-center rounded-full border border-accent hover:bg-accent disabled:opacity-60"
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
        >
          <Image src={Arrow} width={10} alt="next-slide" className="" />
        </Button>
      </div>
    </section>
  );
};

export default GallerySlider;
