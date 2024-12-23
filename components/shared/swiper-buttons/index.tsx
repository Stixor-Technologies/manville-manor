import React, { useEffect, useState } from "react";

import Arrow from "@/public/assets/icons/arrow-white.svg";
import ArrowBlack from "@/public/assets/icons/arrow-black.svg";

import { Button } from "@/components/button";
import Image from "next/image";
import { SwiperClass } from "swiper/react";
import { cn } from "@/lib/utils";

interface SwiperNavigationProps {
  swiperRef: React.MutableRefObject<SwiperClass | null>;
  nextSlide: () => void;
  previousSlide: () => void;
  fromPlans?: boolean;
}

const SwiperButtons: React.FC<SwiperNavigationProps> = ({
  swiperRef,
  nextSlide,
  previousSlide,
  fromPlans,
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
        className={cn(
          "size-[3.625rem] justify-center bg-accent  hover:bg-accent/75 ",
          fromPlans
            ? "disabled:bg-white disabled:opacity-100"
            : "disabled:bg-white/10",
        )}
        onClick={() => {
          previousSlide();
        }}
      >
        <Image
          src={fromPlans && isPrevButtonDisabled ? ArrowBlack : Arrow}
          width={24}
          alt="previous-slide"
        />
      </Button>

      <Button
        disabled={isNextButtonDisabled}
        variant={"icon"}
        size={"icon"}
        className={cn(
          "size-[3.625rem] justify-center bg-accent  hover:bg-accent/75 ",
          fromPlans
            ? "disabled:bg-white disabled:opacity-100"
            : "disabled:bg-white/10",
        )}
        onClick={() => {
          nextSlide();
        }}
      >
        <Image
          src={fromPlans && isNextButtonDisabled ? ArrowBlack : Arrow}
          width={24}
          alt="next-slide"
          className=" rotate-180"
        />
      </Button>
    </div>
  );
};

export default SwiperButtons;
