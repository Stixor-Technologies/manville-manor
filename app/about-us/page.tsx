import React from "react";
import Image from "next/image";
import Faqs from "@/components/shared/faq";
import AboutUs from "@/public/assets/about/about-us.png";
import AboutHero from "@/public/assets/about/about-hero.png";
import { Button } from "@/components/button";
import Box from "@/public/assets/icons/box.svg";
import BoxFeature from "@/public/assets/icons/feature-box.svg";

import Star from "@/public/assets/icons/star.svg";
import Quality from "@/public/assets/icons/quality.svg";
import Security from "@/public/assets/icons/security.svg";

const About = () => {
  const features = [
    {
      name: "High Quality Product",

      icon: Star,
    },
    {
      name: "Management Quality",
      icon: Quality,
    },
    {
      name: "Our Security",
      icon: Security,
    },
  ];

  return (
    <>
      <div className="relative mb-[4.375rem] mt-12 flex items-center justify-center">
        <Image src={AboutHero} alt="about-hero" />
        <h2 className="absolute font-cormorant text-[4rem] font-bold text-white">
          About Us
        </h2>
      </div>

      <section className="container flex flex-col items-center gap-8 px-8 lg:flex-row lg:gap-16 lg:px-16 xl:px-[8.125rem]">
        <div className="">
          <Image src={AboutUs} alt="about-us" />
        </div>

        <div className="w-full text-white lg:max-w-[536px] [&>p]:font-medium">
          <div className="mb-3 flex items-center gap-3">
            <Image src={Box} alt="" />
            <h2 className="text-lg text-secondary">About Us</h2>
          </div>

          <h3 className="mb-4 font-cormorant text-4xl font-bold">
            Our Company Overview
          </h3>
          <p>
            Carlio brand is one of the most reliable motor oil manufacturers,
            which is engaged in the production of high quality products with a
            history of more than decades in the industry. In order to get more
            information about other aspects and products of the Carlio brand,
            you can use the following buttons:
          </p>
          <div className="my-8 h-[1px] w-full bg-secondary" />
          <p>
            The meaning of production in Carlio is the creation, development,
            and the path to progress, and the starting point to achieve the
            goals that we all have the Petroforce brand, with over 20 years of
            experience in the oil and petrochemical industry, we officially
            started our activities in the field of design, engineering,
            construction of refinery equipment, and the production of various
            motor and industrial lubricants in the year 1390 (2011)
          </p>

          <Button className="mt-6">Learn More</Button>
        </div>
      </section>

      <section className="my-[4.375rem] bg-[url('/assets/about/about-bg.png')] bg-cover bg-no-repeat">
        <div className="container flex items-center gap-10 px-8 py-[3.25rem] text-white lg:px-16 xl:gap-[7.1875rem] xl:px-[8.125rem]">
          <div className="w-full">
            <div className="mb-3 flex items-center gap-3">
              <Image src={BoxFeature} alt="" />
              <h2 className="text-lg">Manville Manor Features</h2>
            </div>

            <p className="my-6 text-4xl font-semibold leading-tight">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>

            <Button variant={"invert"}>Contact Us Now</Button>
          </div>

          <div className="flex w-full max-w-[34rem] gap-6">
            {features?.map((feature) => (
              <div
                key={feature?.name}
                className=" flex flex-1 flex-col items-center justify-center border border-white px-4 py-8 text-center font-medium"
              >
                <Image src={feature?.icon} alt={`feature-${feature?.name}`} />
                <h5>{feature?.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mb-[4.375rem] px-8 lg:px-16 xl:px-[8.125rem]">
        <Faqs />
      </div>
    </>
  );
};

export default About;
