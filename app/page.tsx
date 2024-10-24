import Contact from "@/components/shared/contact";
import Faqs from "@/components/shared/faq";
import OfficeLocation from "@/components/home-page/office-location";
import SportsArticle from "@/components/home-page/sports-article";
import EventPackages from "@/components/event-packages";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <div className="container px-8 lg:px-16 xl:px-[8.125rem]">
        <Contact />
        <SportsArticle />
        <EventPackages fromHome />
        <OfficeLocation />
        <Faqs />
      </div>
    </main>
  );
}
