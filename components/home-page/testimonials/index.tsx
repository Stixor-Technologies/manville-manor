"use client";
import React, { useRef } from "react";
import SectionHeader from "@/components/shared/section-header";
import Image from "next/image";
import DummyProfile from "@/public/assets/dummy-profile.png";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabsRefs = useRef<(HTMLElement | null)[]>([]);

  const { contextSafe } = useGSAP();

  const performAnimation = contextSafe((index: number) => {
    const clickedItem = tabsRefs?.current[index];

    if (clickedItem) {
      const elem = document.querySelector(`.active`);
      gsap.to(clickedItem, {
        width: "500px",
        // duration: 2,
      });

      gsap.to(clickedItem?.getElementsByTagName("p"), {
        display: "block",
        opacity: 1,
        // duration: 2,
      });

      gsap.to(clickedItem?.querySelector(".myText"), {
        rotate: "0",
        transformOrigin: "top left",
        // duration: 2,
      });

      gsap.to(clickedItem?.getElementsByTagName("div"), {
        flexDirection: "row",
        alignItems: "center",
      });

      gsap.to(elem, {
        width: "144px",
      });
      console.log("clickedItem", clickedItem);
    }
  });

  return (
    <section className="container">
      <SectionHeader header="TESTIMONY" description="Our Participants Say" />

      <div ref={containerRef} className="flex gap-0.5">
        {[1, 2, 4, 5, 5].map((_, index) => (
          <div
            key={index}
            onClick={() => {
              performAnimation(index);
            }}
            ref={(el) => (tabsRefs.current[index] = el)}
            className={cn(
              "relative cursor-pointer bg-secondary/10 p-12",
              index !== 0 ? "w-36 px-10 py-12" : "active w-[55%]",
            )}
          >
            <div
              className={cn(
                "flex gap-8",
                index !== 0 ? "flex-col" : "items-center",
              )}
            >
              <Image
                src={DummyProfile}
                width={140}
                alt="profile"
                className=""
              />
              <div>
                <h3
                  className={cn(
                    "myText text-[1.375rem] font-medium text-white",

                    index !== 0 && " rotate-90 text-nowrap text-base",
                  )}
                >
                  Wahid Dwipa Santoso
                </h3>
                <h4
                  className={cn(
                    " text-white/60",
                    index !== 0 && "hidden opacity-0",
                  )}
                >
                  House Club Party Organizier
                </h4>
              </div>
            </div>

            <p
              className={cn(
                "mt-10",

                index !== 0 && " hidden opacity-0",
              )}
            >
              I would also like to take this opportunity to thank Conference
              Design for the excellent work both pre-conference and as support
              during the four days. As usual, flawless organisation and
              conducted with humour and infinite patience. The Virtual platform
              was easy to interact with and all features worked well.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
