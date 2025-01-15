import OfficeLocation from "@/components/home-page/office-location";
import HomeHero from "@/components/home-page/home-hero";
import HomeAbout from "@/components/home-page/home-about/home-about";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between overflow-hidden">
      <HomeHero />

      <Suspense>
        <HomeAbout />
      </Suspense>

      <div className="container px-8 lg:px-16 xl:px-[8.125rem]">
        <OfficeLocation />
      </div>
    </main>
  );
}
