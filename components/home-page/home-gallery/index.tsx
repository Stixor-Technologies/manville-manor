"use client";
import SectionHeader from "@/components/shared/section-header";
import React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@/components/button";
import { recentEvents } from "@/utils/utils";

gsap.registerPlugin(ScrollTrigger);
import DummyExplore from "@/public/assets/events/event-7.png";
import { cn } from "@/lib/utils";

const HomeGallery = () => {
  // useGSAP(() => {
  //   let scrollTriggerInstance: ScrollTrigger | undefined;

  //   const mediaQuery = window.matchMedia("(min-width: 1024px)");

  //   const setupScrollTrigger = () => {
  //     // Clean up existing ScrollTrigger instance if it exists
  //     if (scrollTriggerInstance) {
  //       scrollTriggerInstance.kill();
  //     }
  //     if (mediaQuery.matches) {
  //       scrollTriggerInstance = ScrollTrigger.create({
  //         trigger: ".sec-5-left",
  //         pin: true,
  //         start: "top 30%",
  //         end: `${window.innerWidth > 1300 ? "bottom+=100%" : "bottom+=400%"} top`,
  //         markers: true,
  //       });

  //       // gsap.to(".sec-5-blur", {
  //       //   opacity: 1,
  //       //   zIndex: 20,
  //       //   duration: 0.3,
  //       //   scrollTrigger: {
  //       //     trigger: ".sec-5-left",
  //       //     start: "top 100%",
  //       //     end: `${window.innerWidth > 1300 ? "bottom" : "bottom+=200%"} top`,
  //       //     toggleActions: "play reverse reverse reverse",
  //       //   },
  //       // });
  //     }
  //   };

  //   const setupAnimations = () => {
  //     const cards = document.querySelectorAll(".sec-5-card");

  //     cards.forEach((card) => {
  //       gsap.from(card, {
  //         opacity: 0,
  //         y: 50,
  //         duration: 0.3,
  //         scrollTrigger: {
  //           trigger: card,
  //           start: "top 100%",
  //           end: "top 50%",
  //           toggleActions: "play none none reverse",
  //         },
  //       });
  //     });
  //   };

  //   // Initial setup
  //   setupScrollTrigger();
  //   setupAnimations();

  //   // Handle screen resize
  //   const handleResize = () => {
  //     setupScrollTrigger();
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // Cleanup on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     if (scrollTriggerInstance) {
  //       scrollTriggerInstance.kill();
  //     }
  //   };
  // }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        if (context.conditions) {
          const { isDesktop } = context.conditions;

          if (isDesktop) {
            ScrollTrigger.create({
              trigger: ".sec-5-card-wrapper",
              pin: ".sec-5-left",
              start: "top 40%",
              end: "bottom 100%",
              pinSpacing: false,
            });
          }
        }
      },
    );

    const cards: HTMLDivElement[] = gsap.utils.toArray(".sec-5-card");
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        scrollTrigger: {
          trigger: card,
          start: "top 100%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          // markers: true,
        },
      });
    });
  });

  return (
    <section className="container mb-11 mt-24">
      <SectionHeader header="Gallery" description="Explore Manville Manor" />

      <div className="sec-5-card-wrapper mt-[5.5rem] grid grid-cols-1 flex-col place-items-center gap-11 lg:grid-cols-[0.4fr,1fr] lg:place-items-start lg:gap-16">
        <div className="sec-5-left text-center  lg:text-left xl:w-full">
          <h2 className="text-5xl text-white">
            Recent Events held at Manville Manor
          </h2>

          <p className="my-6 text-[1.375rem] text-secondary">
            Explore our gallery to see unforgettable moments from past events.
            Get inspired for your next celebration!
          </p>
          <Button className="hidden lg:block">View All</Button>
        </div>

        {/* event images */}
        <div className="relative flex w-full max-w-[800px] flex-col gap-10 sm:mb-20 sm:flex-row md:mb-0 lg:flex-col lg:justify-self-end xl:shrink-0 xl:flex-row">
          <div className="relative flex flex-1 flex-col items-center gap-11 xl:gap-0">
            {recentEvents?.map((event, index) => (
              <div
                className={cn(
                  "sec-5-card relative flex flex-col justify-center overflow-hidden text-white duration-200 lg:max-w-[25rem]",

                  index === 0
                    ? "sm:self-end"
                    : index % 2 !== 0
                      ? "sm:self-start xl:-mt-24"
                      : "sm:self-end xl:-mt-24",
                )}
              >
                <div className="flex items-center justify-between px-6">
                  <div>
                    <h3>{event.name}</h3>
                    <p className="text-xs">{event?.hostedBy}</p>
                  </div>
                  <p className="text-[4rem] ">{event?.number}</p>
                </div>
                <Image src={event?.media} width={450} height={320} alt="" />
              </div>
            ))}
          </div>
        </div>

        <Button className="lg:hidden">View All</Button>
      </div>
    </section>
  );
};

export default HomeGallery;
