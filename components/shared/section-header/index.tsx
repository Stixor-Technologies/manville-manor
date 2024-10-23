"use client";
import React, { FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  header: string;
  description: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ header, description }) => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-animated-text]",
        start: "top 90%",
      },
    });
    tl.from("[data-animated-text]", {
      opacity: 0,
      y: 50,
      ease: "power1",
      duration: 0.8,
    });
  }, []);

  return (
    <>
      <h2 data-animated-text className="text-center text-xl text-secondary">
        {header}
      </h2>
      <p
        data-animated-text
        className="mt-4 text-center font-cormorant text-[2rem] font-bold leading-tight text-white sm:text-5xl"
      >
        {description}
      </p>
    </>
  );
};

export default SectionHeader;
