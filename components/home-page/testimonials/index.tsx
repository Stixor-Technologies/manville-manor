"use client";
import React, { useRef } from "react";
import SectionHeader from "@/components/shared/section-header";
import Image from "next/image";
import DummyProfile from "@/public/assets/dummy-profile.png";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabsRefs = useRef<(HTMLElement | null)[]>([]);

  const { contextSafe } = useGSAP();

  const performAnimation = contextSafe((index: number) => {
    const clickedItem = tabsRefs?.current[index];
    const activeElement = document.querySelector(`.active`);

    if (clickedItem && activeElement) {
      gsap.to(clickedItem?.getElementsByTagName("h4"), {
        display: "block",
        opacity: 1,
      });

      gsap.to(clickedItem, {
        width: "692px",
      });

      gsap.to(clickedItem?.getElementsByTagName("p"), {
        display: "block",
        opacity: 1,
      });

      gsap.to(clickedItem?.querySelector(".myText"), {
        rotate: "0",
        transformOrigin: "top left",
        duration: 1,
      });

      gsap.to(clickedItem?.getElementsByTagName("div"), {
        flexDirection: "row",
        alignItems: "center",
      });

      gsap.to(activeElement, {
        width: "144px",
      });

      console.log("clickedItem", clickedItem);
    }
  });

  // const firstItemWidthRef = useRef(0); // Store the first item width

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const containerWidth = containerRef.current.offsetWidth;
  //     firstItemWidthRef.current = containerWidth * 0.65; // 70% width
  //     const remainingItemWidth =
  //       (containerWidth * 0.35) / (tabsRefs.current.length - 1);

  //     // Set initial widths dynamically
  //     tabsRefs.current.forEach((tab, index) => {
  //       if (tab) {
  //         tab.style.width =
  //           index === 0
  //             ? `${firstItemWidthRef.current}px`
  //             : `${remainingItemWidth}px`;
  //         tab.style.left =
  //           index !== 0 ? `${firstItemWidthRef.current}px` : "0px";
  //       }
  //     });
  //   }
  // }, []);

  // const performAnimations = (index) => {
  //   const clickedItem = tabsRefs.current[index];
  //   const activeElement = document.querySelector(".active");

  //   if (clickedItem && activeElement) {
  //     const containerWidth = containerRef.current.offsetWidth;
  //     const newFirstItemWidth =
  //       (containerWidth * 0.35) / (tabsRefs.current.length - 1); // Width for non-active items
  //     const expandedWidth = containerWidth * 0.65; // Expanded width

  //     // Animate the current active item to shrink and move
  //     gsap.to(activeElement, {
  //       // width: newFirstItemWidth,
  //       // left: `${firstItemWidthRef.current}px`,
  //       // duration: 0.5,
  //     });

  //     // // Animate the clicked item to expand and move to the left

  //     gsap.to(clickedItem, {
  //       // width: expandedWidth,

  //       left: newFirstItemWidth,
  //       zIndex: 50,
  //       // duration: 0.5,
  //     });

  //     gsap.to(clickedItem, {
  //       width: expandedWidth,
  //       // left: ,
  //       // duration: 0.5,
  //     });

  //     // // Update classes to mark the new active item
  //     // activeElement.classList.remove("active");
  //     // clickedItem.classList.add("active");
  //   }
  // };

  // tabsRefs?.current?.[0].classList.add("active");

  return (
    <section className="container">
      <SectionHeader header="TESTIMONY" description="Our Participants Say" />

      <div ref={containerRef} className="flex gap-0.5">
        {[1, 2, 4, 5, 5].map((_, index) => (
          <div
            key={index}
            ref={(el) => (tabsRefs.current[index] = el)}
            onClick={() => {
              performAnimation(index);
            }}
            className={cn(
              "relative cursor-pointer overflow-hidden bg-secondary/10 p-12",
              index !== 0 ? "w-36 px-10 py-12" : "active1 w-[55%]",
            )}
          >
            <div
            // className={`${index === 0 && "w-[629px]"}`}

            // className={cn(
            //   "relative cursor-pointer bg-secondary/10 p-12",
            //   index !== 0 ? "w-36 px-10 py-12" : "active w-[55%]",
            // )}
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
                      index !== 0 && " opacity-0",
                    )}
                  >
                    House Club Party Organizier
                  </h4>
                </div>
              </div>

              <p
                className={cn(
                  "mt-10 w-[629px]",

                  index !== 0 && " opacity-0",
                )}
              >
                I would also like to take this opportunity to thank Conference
                Design for the excellent work both pre-conference and as support
                during the four days. As usual, flawless organisation and
                conducted with humour and infinite patience. The Virtual
                platform was easy to interact with and all features worked well.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* <div ref={containerRef} className="relative flex gap-0.5">
        {[1, 2, 3, 4].map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => performAnimations(index)}
              ref={(el) => (tabsRefs.current[index] = el)}
              className={cn(
                "relative h-[500px] cursor-pointer bg-secondary/10 p-12",
                index === 0 ? "active absolute" : "",
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
                conducted with humour and infinite patience. The Virtual
                platform was easy to interact with and all features worked well.
              </p>
            </div>
          );
        })}
      </div> */}
    </section>
  );
};

export default Testimonials;
