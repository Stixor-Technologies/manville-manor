import React from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Contact from "@/components/shared/contact";
import Hero from "@/components/shared/hero";
import Head from "next/head";
import { REDIRECT_URL } from "@/utils/contants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Manville Manor - Manville, NJ Event Venue",
  description:
    "Contact Manville Manor to plan your next event. Schedule a tour of our Manville, NJ wedding and event venue, check date availability, or request more information. We're here to help you create an unforgettable event experience.",
};

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
