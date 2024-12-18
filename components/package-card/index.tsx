import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import { EventPackagesType } from "@/utils/types/types";
const cardVariants = cva(
  "transition-all max-w-[458px] flex flex-col w-full text-white rounded-sm px-3 xs:px-5 py-5 relative z-10",
  {
    variants: {
      variant: {
        default:
          "bg-white/5 before:content-[''] before:absolute before:top-0 before:left-0 before:w-[5rem] before:h-[75px] before:bg-[url('/assets/bg-package-1-default.svg')] before:bg-no-repeat  after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-[4rem] after:h-[65px] after:bg-[url('/assets/bg-package-2-default.svg')] after:bg-no-repeat before:-z-10",
        decor:
          "package-clips bg-accent before:content-[''] before:absolute before:top-28 before:right-0 before:w-[4.3rem] before:h-[160px] before:bg-[url('/assets/bg-package-1-decor.svg')] before:bg-no-repeat after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[4rem] after:h-[140px] after:bg-[url('/assets/bg-package-2-decor.svg')] after:bg-no-repeat before:-z-10 after:-z-20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  eventPackage: EventPackagesType;
}

const PackageCard: React.FC<CardProps> = ({
  className,
  eventPackage,
  variant,
  ...props
}) => {
  const buttonVariant = variant === "decor" ? "black" : "default";

  return (
    <div className={cn(cardVariants({ variant }), className)} {...props}>
      <div className="flex items-center justify-between">
        <h2 className="relative max-w-[9.0625rem] text-lg font-semibold leading-none tracking-wider text-white xs:text-[1.375rem]">
          {eventPackage?.attributes.name}
          <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']" />
        </h2>

        <div>
          <div className="text-right text-xs font-normal">
            <h4>
              <span className="text-lg font-bold xs:text-[1.375rem]">
                ${eventPackage?.attributes?.price}
              </span>{" "}
              <span>Plus Tax</span>
            </h4>
            <span>Week Days</span>
          </div>

          <div className="mt-3 text-right text-xs font-normal">
            <h4 className="text-left text-lg font-bold xs:text-[1.375rem]">
              ${eventPackage?.attributes?.weekendPrice}
            </h4>
            <span>(Saturday & Sunday)</span>
          </div>
        </div>
      </div>

      <div className="mb-5 mt-7 flex-1 px-2 xs:mt-12 xs:px-6">
        <ul className={`list-outside list-disc space-y-3 px-5  xs:space-y-6`}>
          {eventPackage?.attributes?.features?.map((feature) => (
            <li key={feature.id}>{feature.feature}</li>
          ))}
        </ul>
        {/* <h4 className="mb-2 mt-6 text-center text-xs leading-none xs:mt-8">
          <span className="text-base font-bold">
            {`$${eventPackage?.attributes?.weekendPrice}`}
          </span>{" "}
          (Saturday & Sunday)
        </h4> */}
      </div>
      <Button href="/booking" variant={buttonVariant} size={"full"}>
        Book Package
      </Button>
    </div>
  );
};

export { PackageCard, cardVariants };
