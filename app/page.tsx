import OfficeLocation from "@/components/home-page/office-location";
import HomeHero from "@/components/home-page/home-hero";
import HomeAbout from "@/components/home-page/home-about/home-about";
import { Suspense } from "react";
import { REDIRECT_URL } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding & Event Venue in Manville, NJ | Manville Manor",
  description:
    "Manville Manor is an elegant event space in Manville, NJ, offering timeless elegance with modern convenience. Host unforgettable weddings, corporate events, baby showers, and more in a versatile venue known as one of NJ's best event venues.",
  alternates: {
    canonical: REDIRECT_URL,
  },
};

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex-col items-center justify-between overflow-hidden">
        <HomeHero />

        <Suspense>
          <HomeAbout />
        </Suspense>

        <div className="container px-8 lg:px-16 xl:px-[8.125rem]">
          <OfficeLocation />
        </div>
      </main>
    </>
  );
}
