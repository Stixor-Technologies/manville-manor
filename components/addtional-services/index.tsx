import React from "react";
import { getAdditionalServices } from "@/utils/api-calls";

const AdditionalFeatures = async () => {
  const additonalServices = await getAdditionalServices();

  return (
    <section className="container py-20 sm:px-[2.5625rem] md:py-28">
      <div className="flex flex-col justify-between gap-11 md:flex-row md:gap-8 lg:gap-16 xl:gap-0">
        <div className="text-center md:max-w-[20rem] md:text-left">
          <h4 className="text-xl text-secondary">Features</h4>
          <h2 className="my-4 font-cormorant text-5xl text-white">
            Additional Features
          </h2>
          <p className="text-[1.375rem] text-secondary">
            Manville Manor Features - Modern Functionality, amusement, and
            entertainment
          </p>
        </div>

        <div className="flex max-w-[46.875rem] flex-1 flex-col gap-10">
          <div className="relative flex justify-between overflow-x-auto">
            <div className="pb-4 text-left text-white">
              <p className="text-lg sm:text-xl sm:font-semibold">Features</p>

              <p className="mt-1 text-lg sm:text-[1.375rem] sm:font-medium">
                Enhance your event with our additional services and rentals:
              </p>
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-1/2 rounded-full bg-white" />

            <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-white/40" />
          </div>

          <div className="grid">
            {additonalServices?.map((service: any, index: number) => (
              <div key={service.id} className="flex flex-1 gap-5">
                <div className={`flex flex-col items-center`}>
                  <div
                    className={`group relative flex size-6 shrink-0 items-center justify-center rounded-full border bg-secondary text-xs `}
                  >
                    <span>{index + 1}</span>
                  </div>

                  <div
                    className={`-ml-[0.031rem] min-h-7 w-px flex-1 bg-secondary/70 ${index === additonalServices?.length - 1 && "hidden"}`}
                  />
                </div>

                <span className="mb-4 flex-1 text-lg text-white">
                  {service?.attributes?.name} -{" "}
                  <span className=" font-semibold">
                    ${service?.attributes?.price}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalFeatures;
