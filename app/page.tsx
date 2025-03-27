import OfficeLocation from "@/components/home-page/office-location";
import HomeHero from "@/components/home-page/home-hero";
import HomeAbout from "@/components/home-page/home-about/home-about";
import { Suspense } from "react";
import { REDIRECT_URL } from "@/utils/contants";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding & Event Venue in Manville, NJ | Manville Manor",
  description:
    "Manville Manor is an elegant event space in Manville, NJ, offering timeless elegance with modern convenience. Host unforgettable weddings, corporate events, baby showers, and more in a versatile venue known as one of NJ's best event venues.",
};

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href={REDIRECT_URL} />
      </Head>

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
