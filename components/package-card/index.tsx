import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import { EventPackage } from "@/utils/types/types";

const cardVariants = cva(
  "transition-all max-w-[23.3125rem] w-full text-white rounded-sm px-3 xs:px-5 py-5 relative z-10",
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
  eventPackage: EventPackage;
}

const PackageCard: React.FC<CardProps> = ({
  className,
  eventPackage,
  variant,
  children,
  ...props
}) => {
  const buttonVariant = variant === "decor" ? "black" : "default";
  const scrollbarClass =
    variant === "decor" ? "scrollbar-decor" : "scrollbar-default";
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props}>
      <div
        className={cn(
          "relative",
          variant === "decor" &&
            "before:package-clip before:xs:w-full before:absolute before:-top-12 before:left-1/2 before:h-9 before:w-[80%] before:max-w-[12.375rem] before:-translate-x-1/2 before:bg-accent before:pt-1 before:text-center before:text-white before:content-['Most_Purchased']",
        )}
      >
        {variant !== "decor" && (
          <p className="absolute right-0 text-right text-xs text-secondary underline">
            Backdrop Choices
          </p>
        )}

        <div className="xs:pt-[2.4375rem] flex justify-between pt-4">
          {children}

          <div className="text-right text-xs font-normal">
            <h4>
              <span className="xs:text-[1.375rem] text-lg font-bold">
                {eventPackage?.weekDaysPrice}
              </span>{" "}
              <span>Plus Tax</span>
            </h4>
            <span>Week Days</span>
          </div>
        </div>

        <div className="xs:px-6 xs:mt-12 mt-7 px-2">
          <ul
            className={`xs:space-y-6 xs:h-full h-52 max-h-[14.8125rem]  list-outside list-disc space-y-3 overflow-y-scroll px-5 ${scrollbarClass}`}
          >
            {eventPackage?.packageFeatures?.map(
              (item: string, index: number) => <li key={index}>{item}</li>,
            )}
          </ul>
          <h4 className="xs:mt-8 mb-2 mt-6 text-center text-xs leading-none">
            <span className="text-base font-bold">
              {eventPackage?.weekEndPrices}
            </span>{" "}
            (Saturday & Sunday)
          </h4>

          <Button variant={buttonVariant} size={"full"}>
            Book Package
          </Button>
        </div>
      </div>
    </div>
  );
};

export { PackageCard, cardVariants };
