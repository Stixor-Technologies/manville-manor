"use client";

import Image from "next/image";
import React, { FC } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import Dash from "@/public/assets/gallery/minus.svg";
import { BASE_URL } from "@/utils/contants";
import { Portfolio } from "@/utils/types/types";

interface GalleryPortfolioProps {
  portfolio: Portfolio[];
  // portfolioFilters: { value: string; label: string }[];
}

const GalleryPortfolio: FC<GalleryPortfolioProps> = ({
  portfolio,
  // portfolioFilters,
}) => {
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

  console.log("portfolio", portfolio);

  // const [selectedFilter, setSelectedFilter] = useState("all");

  // const filteredImages =
  //   selectedFilter === "all"
  //     ? portfolio
  //     : portfolio?.filter(
  //         (image) =>
  //           image?.portfolio_filter?.data?.attributes?.name === selectedFilter,
  //       );

  return (
    <section className="relative px-[1.375rem] md:px-0">
      {/* lg:mb-[6.6875rem] */}
      <div className="container my-11 overflow-hidden lg:mb-[4.1875rem] lg:mt-[8.75rem]">
        {/* mb-11 lg:mb-24 */}
        <h2 className="text-center font-cormorant text-5xl text-white md:text-right ">
          Portfolio
        </h2>

        {/* Filters button*/}

        {/* <div className="scrollbar-hide flex gap-16 overflow-scroll overflow-x-auto sm:justify-end">
          {portfolioFilters?.map((filter) => (
            <Button
              key={filter?.value}
              variant={"icon"}
              size={"icon"}
              onClick={() => setSelectedFilter(filter?.value)}
              className={cn(
                "text-white/70",
                selectedFilter === filter?.value && "text-white",
              )}
            >
              {filter?.label}
            </Button>
          ))}
        </div> */}
      </div>

      {portfolio?.length > 0 ? (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}
          className="min-h-[12.5rem]"
        >
          {/* <Masonry gutter="1rem">
            {portfolio?.flatMap((item) =>
              item?.images?.data?.map((image, i) => (
                <Image
                  key={i}
                  src={BASE_URL + image?.attributes?.url}
                  alt=""
                  className="w-full"
                  width={600}
                  height={500}
                />
              )),
            )}
          </Masonry> */}

          <Masonry gutter="1rem">
            {portfolio?.flatMap((item: any) => (
              <Image
                key={item?.id}
                src={BASE_URL + item?.attributes?.url}
                alt=""
                className="w-full"
                width={600}
                height={500}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <div className="flex h-60 items-center justify-center text-white">
          <p>No Images Found</p>
        </div>
      )}

      <Marquee
        speed={120}
        autoFill
        loop={0}
        pauseOnHover
        className={cn(
          " -bottom-5 z-10 !-rotate-2 bg-secondary",

          portfolio?.length > 0 ? "!absolute" : "static",
        )}
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
};

export default GalleryPortfolio;
