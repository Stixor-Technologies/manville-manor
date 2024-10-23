import React from "react";
import Hero from "@/components/shared/hero";
import AboutHero from "@/public/assets/about/about-hero.png";
import Contact from "@/components/shared/contact";

const ContactUs = () => {
  return (
    <>
      <Hero heroImage={AboutHero} heroHeading="Contact us" />
      <div className="container mb-11 mt-24 px-8 md:my-[6.6875rem] lg:px-16 xl:px-[8.125rem]">
        <Contact />
      </div>
    </>
  );
};

export default ContactUs;
