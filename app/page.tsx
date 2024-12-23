import Contact from "@/components/shared/contact";
// import Faqs from "@/components/shared/faq";
import OfficeLocation from "@/components/home-page/office-location";
// import EventPackages from "@/components/event-packages";
import VenueDetails from "@/components/addtional-services";
// import BackDrops from "@/components/home-page/backdrops";
import HomeHero from "@/components/home-page/home-hero";
import HomeAbout from "@/components/home-page/home-about/home-about";
// import FloorPlans from "@/components/home-page/floor-plans";
// import BlogsSection from "@/components/home-page/blogs";
import { Suspense } from "react";
// import RecentEvents from "@/components/home-page/recent-events";
// import TestimonialsSection from "@/components/home-page/testimonials-section";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between overflow-hidden">
      <HomeHero />

      <Suspense>
        <HomeAbout />
      </Suspense>

      {/* We may remove this */}
      {/* <Suspense>
        <RecentEvents />
      </Suspense> */}

      {/* We may remove this */}

      {/* <Suspense>
        <FloorPlans />
      </Suspense> */}

      <VenueDetails />

      {/* <Suspense>
        <BackDrops />
      </Suspense> */}

      <div className="container px-8 lg:px-16 xl:px-[8.125rem]">
        {/* <div className="pb-10 pt-12 md:pb-20 md:pt-24">
          <EventPackages />
        </div> */}

        {/* Need to remove Blogs and TestimonialsSection Section */}
        {/* <Suspense>
          <BlogsSection />
        </Suspense> */}

        {/* <Suspense>
          <TestimonialsSection />
        </Suspense> */}

        <div className="py-8 md:py-16">
          <Contact />
        </div>

        {/* <div className="py-5 md:py-11">
          <Faqs />
        </div> */}

        <div className="pb-10 pt-12 md:pb-20 md:pt-24">
          <OfficeLocation />
        </div>
      </div>
    </main>
  );
}
