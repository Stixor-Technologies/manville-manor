"use client";
import React, { useRef } from "react";
import { gsap, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const EssentialMetrics = () => {
  gsap.registerPlugin(ScrollTrigger);
  const metricsContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const slides: HTMLDivElement[] = gsap.utils.toArray(".metric");
      ScrollTrigger.create({
        trigger: metricsContainer.current,
        start: "top 90%",
        animation: gsap.from(slides, {
          textContent: 0,
          duration: 3,
          ease: "circ.inOut",
          snap: { textContent: 1 },
        }),
      });
    },
    { dependencies: [metricsContainer] },
  );

  return (
    <div
      ref={metricsContainer}
      className="mx-auto my-14 flex w-full max-w-[46.1875rem] justify-between sm:mt-28 lg:mb-11 lg:mt-[12.4375rem]"
    >
      <div className="metric-container !w-fit !pl-0">
        <h5 className="metric-number text-nowrap">
          +<span className="metric">10</span> Years
        </h5>

        <span className="metric-label">Experience</span>
      </div>

      <div className="metric-container">
        <h5 className="metric-number">
          +<span className="metric">450</span>
        </h5>

        <span className="metric-label">Customers</span>
      </div>

      <div className="metric-container">
        <h5 className="metric-number">
          +<span className="metric">15</span>K
        </h5>

        <span className="metric-label">Portfolio Photos</span>
      </div>
    </div>
  );
};

export default EssentialMetrics;
