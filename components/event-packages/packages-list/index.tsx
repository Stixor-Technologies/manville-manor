"use client";
import { PackageCard } from "@/components/package-card";
import { cn } from "@/lib/utils";
import { EventPackagesType } from "@/utils/types/types";
import React, { FC, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PackagesListProps {
  packages: EventPackagesType[];
  fromHome: boolean;
}

const PackagesList: FC<PackagesListProps> = ({ packages, fromHome }) => {
  const packagesContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const packageSection = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-animated-package-card]",
        start: "top 85%",
      },
    });

    packageSection.from(
      packagesContainer?.current,
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power1",
      },
      0.3,
    );
  }, {});

  return (
    <div
      ref={packagesContainer}
      className={cn(
        "mx-auto grid max-w-[48.8125rem] place-content-center gap-9 md:flex-row",
        fromHome ? "mt-[5.4375rem]" : "mt-[4.25rem]",
        packages?.length > 1 ? "md:grid-cols-2" : "grid-cols-1",
      )}
    >
      {packages?.map((eventPackage, index) => (
        <PackageCard
          key={eventPackage?.id}
          variant={index === 0 ? "decor" : "default"}
          eventPackage={eventPackage}
        ></PackageCard>
      ))}
    </div>
  );
};

export default PackagesList;
