import Faqs from "@/components/faq";
import Contact from "@/components/home-page/contact";
import OfficeLocation from "@/components/home-page/office-location";
import SportsArticle from "@/components/home-page/sports-article";
import { PackageCard } from "@/components/package-card";
import Packages from "@/components/packages";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <div className="container px-8 lg:px-16 xl:px-[8.125rem]">
        <Faqs />
        <Contact />

        <Packages />
        <SportsArticle />
        <OfficeLocation />
      </div>
    </main>
  );
}
