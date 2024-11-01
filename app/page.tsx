import Contact from "@/components/shared/contact";
import Faqs from "@/components/shared/faq";
import OfficeLocation from "@/components/home-page/office-location";
import SportsArticle from "@/components/home-page/sports-article";
import EventPackages from "@/components/event-packages";
import HomeGallery from "@/components/home-page/home-gallery";
import VenueDetails from "@/components/home-page/venue-details";
import BackDrops from "@/components/home-page/backdrops";
import HomeHero from "@/components/home-page/home-hero";
import HomeAbout from "@/components/home-page/home-about/home-about";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between overflow-hidden">
      <HomeHero />
      <HomeAbout />
      <HomeGallery />
      <BackDrops />
      <VenueDetails />
      <div className="container px-8 lg:px-16 xl:px-[8.125rem]">
        <div className="pb-20 pt-24">
          <EventPackages fromHome />
        </div>
        <SportsArticle />

        <div className="py-16">
          <Contact />
        </div>

        <div className="py-11">
          <Faqs />
        </div>

        <div className="pb-20 pt-24">
          <OfficeLocation />
        </div>
      </div>
    </main>
  );
}
