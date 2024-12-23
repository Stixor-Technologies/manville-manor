import React from "react";
import HeaderImage from "@/public/assets/gallery/hero-gallery.png";
import { getBackdrops } from "@/utils/api-calls";
import Hero from "@/components/shared/hero";
import Image from "next/image";
import { BASE_URL } from "@/utils/contants";

const BackdropsPage = async () => {
  const backdrops = await getBackdrops();
  return (
    <>
      <Hero heroImage={HeaderImage} heroHeading="" />
      <div className="container my-10 md:my-20">
        <div className="mx-auto max-w-[67.5rem] ">
          <h2 className="mb-11 text-center text-3xl text-secondary lg:text-5xl">
            View our Backdrop options
          </h2>
          <div className="flex flex-col gap-16">
            {backdrops?.map((backdrop: any) => (
              <div key={backdrop?.id} className="relative">
                <Image
                  width={1080}
                  height={700}
                  src={
                    BASE_URL +
                    backdrop?.attributes?.backDropMedia?.data?.attributes?.url
                  }
                  alt={`${backdrop?.attributes?.name} - image`}
                />

                <div>
                  <p className="absolute bottom-11 left-11 bg-accent px-4 py-2 text-xl text-white">
                    {backdrop?.attributes?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BackdropsPage;
