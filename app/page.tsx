import Contact from "@/components/shared/contact";
import HomeFaqs from "@/components/home-page/home-faq";
import OfficeLocation from "@/components/home-page/office-location";
import SportsArticle from "@/components/home-page/sports-article";
import EventPackages from "@/components/event-packages";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <div className="container px-8 lg:px-16 xl:px-[8.125rem]">
        <HomeFaqs />
        <Contact />

        <EventPackages fromHome />
        <SportsArticle />
        <OfficeLocation />
      </div>
    </main>
  );
}
