import React from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Contact from "@/components/shared/contact";
import Hero from "@/components/shared/hero";

const ContactUs = () => {
  return (
    <>
      <Hero heroImage={HeaderImage} heroHeading="Contact us" />
      <div className="container mb-11 mt-24 md:my-[6.6875rem]">
        <Contact />
      </div>
    </>
  );
};

export default ContactUs;
