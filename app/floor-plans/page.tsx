import React, { Suspense } from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import Hero from "@/components/shared/hero";
import Venues from "@/components/shared/venues";
import FloorPlans from "@/components/floor-plans/floors-list";
import { REDIRECT_URL } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floor Plans | Manville Manor Venue Layout & Capacity",
  description:
    "Explore Manville Manor's floor plans, including indoor hall and any outdoor areas. Discover our venue's layout and capacity (up to 80 guests) and see how we accommodate weddings, small parties, and corporate events with flexible setups and AV equipment.",
  alternates: {
    canonical: `${REDIRECT_URL}/floor-plans`,
  },
};

const FloorPlansPage = async () => {
  return (
    <>
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
