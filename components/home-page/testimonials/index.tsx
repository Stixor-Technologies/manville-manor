"use client";
import React, { useRef } from "react";
import SectionHeader from "@/components/shared/section-header";
import Image from "next/image";
import DummyProfile from "@/public/assets/dummy-profile.png";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP();

  const performAnimation = contextSafe(() => {
    console.log("asas");
  });

  return (
    <section className="container">
      <SectionHeader header="TESTIMONY" description="Our Participants Say" />

      <Button onClick={performAnimation}>Perform Animation</Button>

      <div ref={containerRef} className="flex gap-1">
        {[1, 2, 4, 5, 5].map((_, index) => (
          <div
            key={index}
            className={cn(
              "relative bg-secondary/10 p-12",
              index !== 0 ? "w-36 px-10 py-12" : "w-[55%]",
            )}
          >
            <div className="flex flex-col gap-8">
              <Image
                src={DummyProfile}
                width={140}
                alt="profile"
                className=""
              />
              <div>
                <h3
                  className={cn(
                    "text-[1.375rem] font-medium text-white",

                    index !== 0 && " rotate-90 text-nowrap text-base",
                  )}
                >
                  Wahid Dwipa Santoso
                </h3>
                <h4
                  className={cn(
                    "text-white/60",
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

                index !== 0 && " hidden",
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
