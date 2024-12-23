import React from "react";
import Hero from "@/components/shared/hero";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Faqs from "@/components/shared/faq";

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
