import Faqs from "@/components/faq";
import { PackageCard } from "@/components/package-card";
import Packages from "@/components/packages";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container px-[8.125rem]">
        <Faqs />

        <Packages />
      </div>
    </main>
  );
}
