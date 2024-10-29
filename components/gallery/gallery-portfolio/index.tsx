"use client";

import Image from "next/image";
import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import P1 from "@/public/assets/gallery/portfolio/p1.png";
import P2 from "@/public/assets/gallery/portfolio/p2.png";
import P3 from "@/public/assets/gallery/portfolio/p3.png";
import P4 from "@/public/assets/gallery/portfolio/p4.png";
import P5 from "@/public/assets/gallery/portfolio/p5.png";
import P6 from "@/public/assets/gallery/portfolio/p6.png";
import P7 from "@/public/assets/gallery/portfolio/p7.png";
import P8 from "@/public/assets/gallery/portfolio/p8.png";
import P9 from "@/public/assets/gallery/portfolio/p9.png";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import Dash from "@/public/assets/gallery/minus.svg";

export default function GalleryPortfolio() {
  const categories = ["all", "wedding", "events", "shows", "functions"];

  const images = [
    { asset: P1, category: "wedding" },
    { asset: P2, category: "events" },
    { asset: P4, category: "shows" },
    { asset: P6, category: "functions" },
    { asset: P7, category: "wedding" },
    { asset: P9, category: "events" },
    { asset: P3, category: "shows" },
    { asset: P8, category: "wedding" },
    { asset: P5, category: "functions" },
  ];

  const clientsData = [
    {
      id: 1,
      name: "Manville Manor",
    },

    {
      id: 2,
      name: "Venues",
    },

    {
      id: 3,
      name: "Events",
    },

    {
      id: 4,
      name: "Functions",
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredImages =
    selectedFilter === "all"
      ? images
      : images.filter((image) => image.category === selectedFilter);

  return (
    <section className="relative">
      <div className="container my-11 overflow-hidden lg:mb-[6.6875rem] lg:mt-[8.75rem]">
        <h2 className="mb-11 text-center font-cormorant text-5xl text-white md:text-right lg:mb-24">
          Portfolio
        </h2>

        {/* Filters button*/}

        <div className="scrollbar-hide flex gap-16 overflow-scroll overflow-x-auto sm:justify-end">
          {categories.map((filter) => (
            <Button
              key={filter}
              variant={"icon"}
              size={"icon"}
              onClick={() => setSelectedFilter(filter)}
              className={cn(
                "text-white/70",
                selectedFilter === filter && "text-white",
              )}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 5 }}>
        <Masonry gutter="1rem">
          {filteredImages?.map((image, i) => (
            <Image key={i} src={image.asset} alt="" className="w-full" />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      <Marquee
        speed={120}
        autoFill
        loop={0}
        pauseOnHover
        play={false}
        className=" !absolute -bottom-5 z-10 !-rotate-2 bg-secondary"
      >
        <ul className="min-w-auto relative flex flex-1 overflow-hidden">
          {clientsData?.map((data) => (
            <div key={data?.id} className="flex items-center">
              <li className="bg-dark-silver/20 mx-2 flex max-w-[20.375rem] flex-1 px-[1.125rem] py-[1.563rem] font-cormorant text-3xl md:text-5xl">
                <h4 className="text-nowrap ">{data?.name}</h4>
              </li>

              <Image src={Dash} alt="" className="w-5 md:w-full" />
            </div>
          ))}
        </ul>
      </Marquee>
    </section>
  );
}
