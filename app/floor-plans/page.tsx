import React, { Suspense } from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Hero from "@/components/shared/hero";
import Venues from "@/components/shared/venues";
import FloorPlans from "@/components/floor-plans/floors-list";
import Head from "next/head";
import { REDIRECT_URL } from "@/utils/contants";

const FloorPlansPage = async () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${REDIRECT_URL}/floor-plans`} />
      </Head>
      <Hero heroImage={HeaderImage} heroHeading="" />

      <div className="container my-10 md:my-20">
        <div className="flex w-full flex-col gap-12 md:flex-row">
          <Venues />
          <Suspense>
            <FloorPlans />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default FloorPlansPage;
