import React from "react";
import Hero from "@/components/shared/hero";
import HeroFaq from "@/public/assets/faq-hero.jpg";
import Faqs from "@/components/shared/faq";

const FaqsPage = () => {
  return (
    <>
      <Hero heroImage={HeroFaq} heroHeading="" />
      <div className="container my-10 md:my-20">
        <Faqs />
      </div>
    </>
  );
};

export default FaqsPage;
