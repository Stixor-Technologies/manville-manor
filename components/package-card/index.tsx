import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import { Backdrops, EventPackagesType } from "@/utils/types/types";
import Image from "next/image";
import Close from "@/public/assets/icons/close-dark.svg";

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
  eventPackage: EventPackagesType;
  backdrops: Backdrops[];
  additonalServices: any[];
}

const PackageCard: React.FC<CardProps> = ({
  className,
  eventPackage,
  backdrops,
  additonalServices,
  variant,
  ...props
}) => {
  const [openBackdropChoices, setopenBackdropChoices] =
    React.useState<boolean>(false);
  const buttonVariant = variant === "decor" ? "black" : "default";
  const scrollbarClass =
    variant === "decor" ? "scrollbar-decor" : "scrollbar-default";

  const toggleBackdropChoices = () => {
    setopenBackdropChoices(!openBackdropChoices);
  };

  return (
    <div className={cn(cardVariants({ variant }), className)} {...props}>
      <div
        className={cn(
          "relative",
          variant === "decor" &&
            "before:package-clip before:absolute before:-top-12 before:left-1/2 before:h-9 before:w-[80%] before:max-w-[12.375rem] before:-translate-x-1/2 before:bg-accent before:pt-1 before:text-center before:text-white before:content-['Most_Purchased'] before:xs:w-full",
        )}
      >
        {variant !== "decor" && (
          <>
            <button
              onClick={toggleBackdropChoices}
              className="absolute right-0 text-right text-xs text-secondary underline"
            >
              Backdrop Choices
            </button>

            {openBackdropChoices && (
              <div className="absolute right-0 top-6 z-20 max-h-[450px] w-full overflow-y-scroll rounded-[.375rem]  bg-secondary bg-[url('/assets/bg-backdrop-choices.svg')] bg-contain bg-[right_top_1rem] bg-no-repeat px-3 py-9 text-black md:max-h-[650px] md:w-[170%] md:px-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium leading-tight xs:text-[1.375rem]">
                    Choices Of Backdrop Sign
                  </h3>
                  <button onClick={toggleBackdropChoices}>
                    <Image src={Close} alt="close" width={23} height={23} />
                  </button>
                </div>

                <ul className="mt-3 max-h-[9.375rem] list-inside list-disc space-y-3 overflow-y-scroll pl-2 xs:mt-6 xs:!space-y-5">
                  {backdrops?.map((backdrop, index) => (
                    <li key={index}>{backdrop?.attributes?.name}</li>
                  ))}
                </ul>

                <div className="mt-8">
                  <h3 className="text-lg font-medium leading-tight xs:text-[1.375rem]">
                    Enhance your event with our additional services and rentals:
                  </h3>

                  <ul className="mt-3 max-h-[18.75rem] space-y-3 overflow-y-scroll xs:mt-6 xs:space-y-5">
                    {additonalServices?.map((service) => (
                      <li key={service?.id}>
                        {service?.attributes?.name} - $
                        {service?.attributes?.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex items-center justify-between pt-[2.4375rem] md:items-stretch">
          <h2 className="relative max-w-[9.0625rem] text-lg font-semibold leading-none tracking-wider text-white xs:text-[1.375rem]">
            {eventPackage?.attributes.name}
            <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-4 after:bg-white after:content-['']" />
          </h2>

          <div className="text-right text-xs font-normal">
            <h4>
              <span className="text-lg font-bold xs:text-[1.375rem]">
                ${eventPackage?.attributes?.price}
              </span>{" "}
              <span>Plus Tax</span>
            </h4>
            <span>Week Days</span>
          </div>
        </div>

        <div className="mt-7 px-2 xs:mt-12 xs:px-6">
          <ul
            className={`h-52 max-h-[14.8125rem] list-outside list-disc  space-y-3 overflow-y-scroll px-5  xs:space-y-6 ${scrollbarClass}`}
          >
            {eventPackage?.attributes?.features?.map((feature) => (
              <li key={feature.id}>{feature.feature}</li>
            ))}
          </ul>
          <h4 className="mb-2 mt-6 text-center text-xs leading-none xs:mt-8">
            <span className="text-base font-bold">
              {`$${eventPackage?.attributes?.weekendPrice}`}
            </span>{" "}
            (Saturday & Sunday)
          </h4>

          <Button href="/booking" variant={buttonVariant} size={"full"}>
            Book Package
          </Button>
        </div>
      </div>
    </div>
  );
};

export { PackageCard, cardVariants };
