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
  className="mx-auto my-14 flex w-full max-w-[46.1875rem] justify-between"
>
  <div className="metric-container pr-2 sm:pr-4 text-center [@media(max-width:430px)]:pr-4">
    <h5 className="metric-number whitespace-nowrap">
      +<span className="metric">10</span> Years
    </h5>
    <span className="metric-label">Experience</span>
  </div>

  <div className="metric-container pr-2 sm:pr-4 text-center [@media(max-width:430px)]:pr-4">
    <h5 className="metric-number whitespace-nowrap">
      +<span className="metric">450</span>
    </h5>
    <span className="metric-label">Customers</span>
  </div>

  <div className="metric-container pr-2 sm:pr-4 text-center [@media(max-width:430px)]:pr-4">
    <h5 className="metric-number whitespace-nowrap">
      +<span className="metric">15</span>K
    </h5>
    <span className="metric-label">Portfolio Photos</span>
  </div>
</div>

  );
};

export default EssentialMetrics;
