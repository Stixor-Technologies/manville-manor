import Contact from "@/components/shared/contact";
import Faqs from "@/components/shared/faq";
import OfficeLocation from "@/components/home-page/office-location";
import EventPackages from "@/components/event-packages";
import HomeGallery from "@/components/home-page/home-gallery";
import VenueDetails from "@/components/home-page/venue-details";
import BackDrops from "@/components/home-page/backdrops";
import HomeHero from "@/components/home-page/home-hero";
import HomeAbout from "@/components/home-page/home-about/home-about";
import FloorPlans from "@/components/home-page/floor-plans";
// import BlogsSection from "@/components/home-page/blogs";
// import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between overflow-hidden">
      <HomeHero />
      <HomeAbout />
      <HomeGallery />
      <FloorPlans />
      <VenueDetails />
      <BackDrops />
      <div className="container px-8 lg:px-16 xl:px-[8.125rem]">
        <div className="pb-10 pt-12 md:pb-20 md:pt-24">
          <EventPackages fromHome />
        </div>

        {/* <Suspense> */}
        {/* <BlogsSection /> */}
        {/* </Suspense> */}

        <div className="py-8 md:py-16">
          <Contact />
        </div>

        <div className="py-5 md:py-11">
          <Faqs />
        </div>

        <div className="pb-10 pt-12 md:pb-20 md:pt-24">
          <OfficeLocation />
        </div>
      </div>
    </main>
  );
}
