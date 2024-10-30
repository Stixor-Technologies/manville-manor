"use client";
import React, { FC, useRef } from "react";
import { PackageCard } from "../package-card";
import SectionHeader from "../shared/section-header";
import { venuePackage, decorPackage } from "@/utils/utils";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface EventPackages {
  fromHome?: boolean;
}

const EventPackages: FC<EventPackages> = ({ fromHome }) => {
  const packagesContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const packageSection = gsap.timeline({
        scrollTrigger: {
          trigger: packagesContainer?.current,
          start: "top 85%",
        },
      });

      packageSection.from("[data-animated-package-text]", {
        opacity: 0,
        y: 50,
        ease: "power1",
        duration: 0.8,
      });

      packageSection.from(
        "[data-animated-package-card]",
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power1",
          stagger: 0.3,
        },
        0.3,
      );
    },
    { scope: packagesContainer },
  );

  return (
    <div ref={packagesContainer}>
      {fromHome ? (
        <SectionHeader header="Pricing" description="Event Packages" />
      ) : (
        <h2
          data-animated-package-text
          className="text-center text-3xl text-secondary md:text-5xl"
        >
          Best Plans For Events
        </h2>
      )}

      <div
        data-animated-package-card
        className={cn(
          "flex flex-col items-center justify-center gap-9 md:flex-row",
          fromHome ? "mt-[5.4375rem]" : "mt-[4.25rem]",
        )}
      >
        <PackageCard variant={"decor"} eventPackage={venuePackage}>
          <h2 className="text-lg font-semibold leading-none tracking-wider text-white xs:text-[1.375rem]">
            Venue Only <br />{" "}
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']">
              P
            </span>
            ackage
          </h2>
        </PackageCard>
        <PackageCard eventPackage={decorPackage}>
          <h2 className="text-lg font-semibold leading-none tracking-wider text-white xs:text-[1.375rem]">
            Venue & <br />{" "}
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']">
              D
            </span>
            ecor Package
          </h2>
        </PackageCard>
      </div>
    </div>
  );
};

export default EventPackages;
