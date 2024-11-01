import React, { useEffect, useState } from "react";

import Arrow from "@/public/assets/icons/arrow-white.svg";
import { Button } from "@/components/button";
import Image from "next/image";
import { SwiperClass } from "swiper/react";

interface SwiperNavigationProps {
  swiperRef: React.MutableRefObject<SwiperClass | null>;
  nextSlide: () => void;
  previousSlide: () => void;
}

const SwiperButtons: React.FC<SwiperNavigationProps> = ({
  swiperRef,
  nextSlide,
  previousSlide,
}) => {
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  useEffect(() => {
    const updateButtonState = () => {
      if (swiperRef?.current) {
        const isPrevButtonDisabled = swiperRef.current.isBeginning;
        const isNextButtonDisabled = swiperRef.current.isEnd;
        setIsPrevButtonDisabled(isPrevButtonDisabled);
        setIsNextButtonDisabled(isNextButtonDisabled);
      }
    };

    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      swiperInstance.on("slideChange", updateButtonState);
      updateButtonState();
    }

    return () => {
      swiperInstance?.off("slideChange", updateButtonState);
    };
  }, [swiperRef]);

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        disabled={isPrevButtonDisabled}
        variant={"icon"}
        size={"icon"}
        className="size-[3.625rem] justify-center bg-accent  hover:bg-accent/75 disabled:bg-white/10"
        onClick={() => {
          previousSlide();
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
          nextSlide();
        }}
      >
        <Image
          src={Arrow}
          width={24}
          alt="next-slide"
          className=" rotate-180"
        />
      </Button>
    </div>
  );
};

export default SwiperButtons;
