"use client";
import React, { useEffect, useRef } from "react";
import SectionHeader from "@/components/shared/section-header";
import Image from "next/image";
import DummyProfile from "@/public/assets/dummy-profile.png";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import Quotes from "@/public/assets/icons/quotes.svg";

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabsRefs = useRef<(HTMLElement | null)[]>([]);

  const { contextSafe } = useGSAP();

  const firstItemWidthRef = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      firstItemWidthRef.current = containerWidth * 0.65; // 70% width
      console.log(firstItemWidthRef.current);

      const remainingItemWidth =
        (containerWidth * 0.35) / (tabsRefs.current.length - 1);

      // Set initial widths dynamically
      tabsRefs?.current?.[0]?.classList.add("active");
      tabsRefs.current.forEach((tab, index) => {
        if (tab) {
          tab.style.width =
            index === 0
              ? `${firstItemWidthRef.current}px`
              : `${remainingItemWidth}px`;
          // tab.style.left =
          //   index !== 0 ? `${firstItemWidthRef.current}px` : "0px";
        }
      });
    }
  }, []);

  console.log(firstItemWidthRef.current);

  const performAnimations = contextSafe((index: number) => {
    const clickedItem = tabsRefs.current[index];
    const activeElement = document.querySelector(".active");
    const isActiveClicked = clickedItem?.classList.contains("active");

    if (clickedItem && activeElement && !isActiveClicked) {
      const containerWidth = containerRef.current.offsetWidth;
      const newFirstItemWidth =
        (containerWidth * 0.35) / (tabsRefs.current.length - 1);
      const expandedWidth = containerWidth * 0.65;

      const tl = gsap.timeline();

      tl.to(activeElement, {
        width: newFirstItemWidth,
        duration: 0.7,
      });

      tl.to(
        clickedItem,
        {
          width: expandedWidth,
          duration: 0.7,
        },
        0,
      );

      tl.to(
        clickedItem?.getElementsByTagName("h4"),
        {
          opacity: 1,
          duration: 1,
        },
        0.05,
      );

      tl.to(
        activeElement?.getElementsByTagName("h4"),
        {
          opacity: 0,
          duration: 0.6,
        },
        0,
      );

      tl.to(
        clickedItem?.querySelector(".name-container"),
        {
          top: "50%",
          left: "172px",
        },
        0,
      );

      tl.to(
        clickedItem?.querySelector(".myText"),
        {
          rotate: "0",
          transformOrigin: "top left",
          left: "172px",
          top: "30%",
          fontSize: "22px",
          duration: 0.5,
        },
        0.12,
      );

      tl.to(
        clickedItem?.querySelector(".quotes-image"),
        {
          opacity: 1,
        },
        0,
      );

      tl.to(
        activeElement?.querySelector(".myText"),
        {
          rotate: "90deg",
          transformOrigin: "top left",
          left: "70%",
          top: "140%",
          fontSize: "16px",
          duration: 0.5,
        },
        0.2,
      );

      tl.to(
        activeElement?.querySelector(".quotes-image"),
        {
          opacity: 0,
        },
        0,
      );

      tl.to(
        clickedItem?.getElementsByTagName("p"),
        {
          opacity: 1,
          duration: 0.5,
        },
        0.2,
      );

      tl.to(
        activeElement?.getElementsByTagName("p"),
        {
          opacity: 0,
        },
        "-0.2",
      );

      clickedItem.classList.add("active");
      activeElement.classList.remove("active");
    }
  });

  return (
    <section className="container hidden lg:block">
      <SectionHeader header="TESTIMONY" description="Our Participants Say" />

      <div ref={containerRef} className="relative mt-16 flex gap-0.5">
        {[1, 2, 3, 4].map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => performAnimations(index)}
              ref={(el) => (tabsRefs.current[index] = el)}
              className={cn(
                "relative h-[31.25rem] cursor-pointer bg-secondary/10 p-6",
              )}
            >
              <div
                className={cn(
                  " relative flex gap-8",
                  index !== 0 ? "flex-cols" : "items-center",
                )}
              >
                <Image
                  src={DummyProfile}
                  width={140}
                  alt="profile"
                  className=""
                />

                <h3
                  className={cn(
                    "myText absolute text-nowrap text-[1.375rem] font-medium text-white",
                    index !== 0
                      ? "left-[70%] top-[140%] origin-top-left rotate-90  text-base"
                      : "left-[172px] top-[25%] -translate-y-[25%]",
                  )}
                >
                  Wahid Dwipa Santoso
                </h3>
                <div
                  className={cn(
                    " name-container absolute w-[180px]",
                    index !== 0 ? "left-20" : "left-[10.75rem] ",
                  )}
                >
                  <h4
                    className={cn(
                      " text-white/60",
                      index !== 0 && " opacity-0",
                    )}
                  >
                    House Club Party Organizier
                  </h4>
                </div>
              </div>

              <Image
                src={Quotes}
                alt="quotes"
                className={cn(
                  "quotes-image my-10",
                  index !== 0 ? "opacity-0" : "opacity-100",
                )}
              />

              <p
                className={cn(
                  "w-[80%] min-w-[32.1875rem] text-white",

                  index !== 0 && "opacity-0",
                )}
              >
                I would also like to take this opportunity to thank Conference
                Design for the excellent work both pre-conference and as support
                during the four days. As usual, flawless organisation and
                conducted with humour and infinite patience. The Virtual
                platform was easy to interact with and all features worked well.
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
