import React from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Contact from "@/components/shared/contact";
import Hero from "@/components/shared/hero";
import Head from "next/head";
import { REDIRECT_URL } from "@/utils/contants";

const ContactUs = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${REDIRECT_URL}/contact-us`} />
      </Head>
      <Hero heroImage={HeaderImage} heroHeading="Contact us" />
      <div className="container mb-11 mt-24 md:my-[6.6875rem]">
        <Contact />
      </div>
    </>
  );
};

export default ContactUs;
