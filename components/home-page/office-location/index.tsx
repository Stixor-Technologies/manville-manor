import React from "react";
import Image from "next/image";
import Location from "@/public/assets/location.png";
import SMS from "@/public/assets/icons/sms.svg";
import Call from "@/public/assets/icons/call.svg";
import Link from "next/link";

const OfficeLocation = () => {
  return (
    <section>
      <div className="grid grid-cols-[0.95fr_1fr_0.08fr] grid-rows-[1fr_0.5fr_0.5fr] text-white">
        <Image
          src={Location}
          alt="location-bg"
          className="col-span-3 col-start-1 row-span-2 row-start-1 rounded-sm"
        />

        <div className="col-start-2 row-span-2 row-start-2 flex max-w-xl flex-col justify-center bg-accent/50 px-4 pr-4  backdrop-blur-lg lg:pl-12">
          <h4 className="text-[clamp(12px,1.4vw,20px)] font-semibold ">
            Location
          </h4>
          <p className="font-cormorant text-[clamp(12px,2.5vw,36px)] leading-tight">
            Located in the heart of Manville, NJ, Manville Manor is where
            elegance meets excellence.
          </p>
        </div>

        <div className="col-start-1 row-start-3 mt-9 flex max-w-fit flex-col items-start gap-2 self-start text-white/65 lg:text-[1.375rem] xl:flex-row xl:gap-4">
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
