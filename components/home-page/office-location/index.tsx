import React from "react";
import Image from "next/image";
import Location from "@/public/assets/location.png";
import SMS from "@/public/assets/icons/sms.svg";
import Call from "@/public/assets/icons/call.svg";
import Link from "next/link";

const OfficeLocation = () => {
  return (
    <section>
      <div className="grid grid-cols-1 grid-rows-[1fr_0.4fr_0.4fr_auto] text-white sm:grid-cols-[0.95fr_1fr_0.08fr] sm:!grid-rows-[1fr_0.5fr_0.5fr] xs:grid-rows-[1fr_0.15fr_0.15fr_auto]">
        <picture className="col-span-3 col-start-1 row-span-2 row-start-1 rounded-sm">
          <source media="(min-width: 640px)" srcSet="/assets/location.png" />
          <source srcSet="/assets/location-mobile.png" />
          <img />
        </picture>

        <div className="col-start-2 row-span-2 row-start-2 mx-auto flex w-[90%] max-w-xl flex-col justify-center bg-accent/50 px-4 pr-4 text-center backdrop-blur-lg sm:mx-0 sm:w-full  sm:text-left lg:pl-12">
          <h4 className="text-[clamp(22px,1.4vw,22px)] font-semibold ">
            Location
          </h4>
          <p className="mt-2 font-cormorant text-[clamp(22px,2.5vw,36px)] leading-tight md:mt-4">
            Located in the heart of Manville, NJ, Manville Manor is where
            elegance meets excellence.
          </p>
        </div>

        <div className="col-start-2 row-start-4 mx-auto mt-9 flex w-[90%] max-w-fit flex-col items-center gap-4 text-center text-[1.375rem] text-white/65 sm:col-start-1 sm:row-start-3 sm:mx-0 sm:w-full sm:items-start sm:gap-4 sm:self-start sm:text-base lg:text-[1.375rem] xl:flex-row xl:gap-4">
          <div className="flex items-center gap-2">
            <Image src={SMS} alt="sms-icon" />
            <Link href="mailto:conference2022@design.com">
              conference2022@design.com
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Image src={Call} alt="call-icon" />
            <Link href="tel:(704)555-0127" className="text-nowrap">
              (704) 555-0127
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocation;
