"use client";
import React, { useRef } from "react";
import { venueDetails } from "@/utils/utils";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const VenueDetails = () => {
  const underlineRef = useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP({});

  const handleTabClick = contextSafe((category: string, idx: number) => {
    const containerWidth = (underlineRef.current?.clientWidth || 0) * 2;
    const leftPosition = idx === 0 ? 0 : containerWidth / venueDetails?.length;

    if (underlineRef.current) {
      gsap.to(underlineRef.current, {
        duration: 0.3,
        left: leftPosition,
        width: "50%",
        ease: "power2.out",
      });
    }

    const points: HTMLDivElement[] = gsap.utils.toArray(".list");
    const elem = document.querySelector(`#${category}`);

    const tl = gsap.timeline();
    tl.to(
      points,
      {
        autoAlpha: 0,
        display: "none",
        translateY: 0,
        duration: 0.5,
      },
      "<",
    ).to(
      elem,
      {
        autoAlpha: 1,
        display: "block",
        duration: 0.5,
      },
      "<",
    );
  });

  return (
    <section className="container py-28 sm:px-[2.5625rem]">
      <div className="flex flex-col justify-between gap-11 md:flex-row md:gap-8 lg:gap-16 xl:gap-0">
        <div className="text-center md:max-w-[20rem] md:text-left">
          <h4 className="text-xl text-secondary">Venue</h4>
          <h2 className="my-4 text-5xl text-white">Venue Details </h2>
          <p className="text-[1.375rem] text-secondary">
            Manville Manor Amenities - Modern Functionality, amusement, and
            entertainment
          </p>
        </div>

        <div className="flex max-w-[46.875rem] flex-1 flex-col gap-12">
          {/* tabs */}
          <div className="relative flex justify-between overflow-x-auto ">
            {venueDetails?.map((item, idx) => {
              return (
                <button
                  key={idx}
                  data-id={idx}
                  className="tab-btn pb-6 text-left text-white/40"
                  data-index={idx}
                  onClick={() => handleTabClick(item?.name, idx)}
                >
                  <span className="mb-2.5 inline-block text-xl">
                    {item?.item}
                  </span>
                  <p>
                    <span className="mr-1 text-2xl font-bold xs:mr-4 xs:text-3xl">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {item?.name}
                  </p>
                </button>
              );
            })}
            <div
              ref={underlineRef}
              className="absolute bottom-0 left-0 h-1 w-1/2 rounded-full bg-white"
            />

            <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-white/40" />
          </div>

          {/* tabs content */}
          <div className="grid lg:min-h-[35.25rem]">
            {venueDetails?.map((itemData, index) => (
              <div
                id={itemData?.name}
                key={index}
                data-slide={index + 1}
                className={cn(
                  "list col-start-1 row-start-1",
                  index !== 0 && "opacity-0",
                )}
              >
                {itemData?.list?.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-1 gap-5">
                      <div className={`flex flex-col items-center`}>
                        <div
                          className={`group relative flex size-6 shrink-0 items-center justify-center rounded-full border bg-secondary text-xs `}
                        >
                          <span>{index + 1}</span>
                        </div>

                        <div
                          className={`-ml-[0.031rem] min-h-7 w-px flex-1 bg-secondary/70 ${index === itemData?.list?.length - 1 && "hidden"}`}
                        />
                      </div>

                      <span className="mb-4 flex-1 text-lg text-white">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueDetails;
