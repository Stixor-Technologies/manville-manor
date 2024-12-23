import React, { FC } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface HeroProps {
  heroImage: StaticImageData;
  heroHeading: string;
}

const Hero: FC<HeroProps> = ({ heroImage, heroHeading }) => {
  return (
    <div className=" relative flex items-center justify-center">
      <Image src={heroImage} alt="about-hero" />
      <h2 className="absolute font-cormorant text-[4rem] font-bold text-white">
        {heroHeading}
      </h2>
    </div>
  );
};

export default Hero;
