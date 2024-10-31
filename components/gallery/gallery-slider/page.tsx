"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DummyArticle from "@/public/assets/dummy-article.png";
import Arrow from "@/public/assets/icons/arrow-white.svg";
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
import SwiperButtons from "@/components/shared/swiper-buttons";

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
    setIsPrevButtonDisabled(isPrevButtonDisabled);
    setIsNextButtonDisabled(isNextButtonDisabled);
  };

  return (
    <section className="mx-auto max-w-[96rem]">
      <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        freeMode={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        // onSlideChange={handleSlideChange}
      >
        {[Slide1, Slide2, Slide3, Slide4, Slide5].map((slide, index) => (
          <SwiperSlide
            key={index}
            className="mr-[1.125rem] last:mr-0 sm:max-w-[18.3125rem]"
          >
            <Image src={slide} alt={`gallery-slide-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="mt-8 flex items-center justify-center gap-3">
        <Button
          disabled={isPrevButtonDisabled}
          variant={"icon"}
          size={"icon"}
          className="size-[3.625rem] justify-center bg-accent  hover:bg-accent/75 disabled:bg-white/10"
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
        >
          <Image src={Arrow} width={24} alt="previous-slide" />
        </Button>

        <Button
          disabled={isNextButtonDisabled}
          variant={"icon"}
          size={"icon"}
          className="size-[3.625rem] justify-center bg-accent  hover:bg-accent/75 disabled:bg-white/10"
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
        >
          <Image
            src={Arrow}
            width={24}
            alt="next-slide"
            className=" rotate-180"
          />
        </Button>
      </div> */}

      <SwiperButtons
        swiperRef={swiperRef}
        nextSlide={() => {
          swiperRef.current?.slideNext();
        }}
        previousSlide={() => {
          swiperRef.current?.slidePrev();
        }}
      />
    </section>
  );
};

export default GallerySlider;
