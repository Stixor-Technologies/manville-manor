"use client";
import React from "react";
import Image from "next/image";
import AboutUs from "@/public/assets/about/about-us.png";
import AboutHero from "@/public/assets/about/about-hero.png";
import { Button } from "@/components/button";
import Box from "@/public/assets/icons/box.svg";
import BoxFeature from "@/public/assets/icons/feature-box.svg";

import Star from "@/public/assets/icons/star.svg";
import Quality from "@/public/assets/icons/quality.svg";
import Security from "@/public/assets/icons/security.svg";
import Hero from "@/components/shared/hero";
import Faqs from "@/components/shared/faq";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const features = [
    {
      name: "High Quality Service",

      icon: Star,
    },
    {
      name: "Expert Management",
      icon: Quality,
    },
    {
      name: "Customizable Event Solutions",
      icon: Security,
    },
  ];

  useGSAP(() => {
    // timeline for about section
    const aboutSection = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-animated-about-image]",
        start: "top 90%",
      },
    });
    aboutSection.from("[data-animated-about-image]", {
      opacity: 0,
      scale: 0.9,
      ease: "power1",
      duration: 0.8,
    });

    aboutSection.from(
      "[data-animated-about-text]",
      {
        opacity: 0,
        y: 30,
        ease: "power1",
        duration: 0.8,
      },
      0.3,
    );

    // timeline for feature section
    const featureSection = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-animated-feature-text]",
        start: "top 85%",
      },
    });
    featureSection.from("[data-animated-feature-text]", {
      opacity: 0,
      y: 50,
      ease: "power1",
      duration: 0.8,
    });
    featureSection.from(
      "[data-animated-feature-box]",
      {
        opacity: 0,
        scale: 0.9,
        ease: "power1",
        duration: 0.8,
      },
      0.3,
    );
  }, []);

  return (
    <>
      <Hero heroImage={AboutHero} heroHeading="About us" />

      {/* about us section*/}
      <section className="container mt-12 grid grid-cols-1 flex-col place-items-center text-center md:mt-[4.375rem] lg:grid-cols-[1fr,0.93fr] lg:gap-x-16 lg:text-left">
        <div
          data-animated-about-text
          className="mb-8 self-end text-white lg:col-start-2 lg:mb-0"
        >
          <div className="mb-2 flex items-center justify-center gap-1 lg:justify-start">
            <Image src={Box} alt="" />
            <h2 className="text-lg text-secondary">About Us</h2>
          </div>

          <h3 className="mb-4 font-cormorant text-[2rem] font-bold leading-none sm:text-4xl">
            Our Company Overview
          </h3>
          <p>
            Carlio brand is one of the most reliable motor oil manufacturers,
            which is engaged in the production of high quality products with a
            history of more than decades in the industry. In order to get more
            information about other aspects and products of the Carlio brand,
            you can use the following buttons:
          </p>
        </div>

        <Image
          src={AboutUs}
          alt="about-us"
          data-animated-about-image
          className="lg:col-start-1 lg:row-span-2 lg:row-start-1"
        />

        <div data-animated-about-text className="self-start text-white">
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

      {/* features section */}
      <section className="my-11 bg-[url('/assets/about/about-bg.png')] bg-cover bg-no-repeat md:my-[4.375rem]">
        <div className="container flex flex-col items-center gap-10 py-[3.25rem] text-white lg:flex-row xl:gap-[7.1875rem]">
          <div
            data-animated-feature-text
            className="w-full text-center lg:text-left"
          >
            <div
              data-animated-about
              className="flex items-center justify-center gap-1 lg:justify-start"
            >
              <Image src={BoxFeature} alt="" />
              <h2 className="text-lg">Manville Manor Features</h2>
            </div>

            <p className="my-4 text-[1.375rem] font-semibold leading-tight sm:text-4xl lg:my-6">
              Elevate your event experience with our exceptional offerings.
            </p>

            <Button href="/contact-us" variant={"invert"}>
              Contact Us Now
            </Button>
          </div>

          <div className="flex w-full max-w-[34rem] flex-wrap justify-center  gap-6 md:items-start lg:flex-nowrap">
            {features?.map((feature) => (
              <div
                key={feature?.name}
                data-animated-feature-box
                className="flex min-w-[10.3125rem] flex-1 flex-col items-center justify-center border border-white px-6 py-8 text-center font-medium"
              >
                <Image
                  src={feature?.icon}
                  alt={`feature-${feature?.name}`}
                  className="max-h-[4.5625rem]"
                />
                <h5>{feature?.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* faq's section */}
      <div className="container mb-[4.375rem]">
        <Faqs />
      </div>
    </>
  );
};

export default About;
