import React from "react";
import Hero from "@/components/shared/hero";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Faqs from "@/components/shared/faq";
import { REDIRECT_URL } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Manville Manor - Event Venue Q&A",
  description:
    "Have questions about hosting an event at Manville Manor? Our FAQs cover venue capacity, catering options, available AV equipment, booking policies, and more. Get quick answers to plan your wedding, party, or corporate event at our Manville, NJ venue.",
  alternates: {
    canonical: `${REDIRECT_URL}/faqs`,
  },
};

const FaqsPage = () => {
  return (
    <>
      <Hero heroImage={HeaderImage} heroHeading="" />
      <div className="container my-10 md:my-20">
        <Faqs />
      </div>
    </>
  );
};

export default FaqsPage;
