"use client";
import React, { FC, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";

interface VenueListProps {
  venueList: any[];
}

const VenueList: FC<VenueListProps> = ({ venueList }) => {
  console.log("venueList", venueList);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedVenue = searchParams.get("venue");

  const handleFilterChange = (activeVenue: string) => {
    console.log("activeVenue", activeVenue);
    const newUrl = new URL(pathname, window.location.origin);
    newUrl.searchParams.set("venue", activeVenue);
    router.replace(newUrl.toString(), { scroll: false });
  };

  useEffect(() => {
    if (venueList) {
      handleFilterChange(venueList?.[0]?.label);
    }
  }, []);

  return (
    <>
      <div className="hidden w-full max-w-[200px] md:block lg:max-w-[18rem]">
        <ul className="sticky top-[6rem] list-none">
          {venueList?.map((venue) => (
            <li key={venue?.value}>
              <button
                className={cn(
                  "relative w-full px-6 py-[.875rem] text-left text-xl text-white transition-all duration-300 ease-in-out ",

                  selectedVenue === venue?.label
                    ? "font-metro-medium rounded-br-full rounded-tr-full bg-accent text-white before:opacity-100"
                    : "",
                )}
                onClick={() => {
                  handleFilterChange(venue?.label);
                }}
              >
                {venue?.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:hidden">
        <Select
          defaultValue={venueList?.[0]}
          classNames={{
            control: () =>
              `text-xs !min-h-[1.7rem] text-white !rounded-none !shadow-none !border-t-0 !border-x-0 focus:!border-white !bg-transparent focus:!ring-0  "border-white"`,
            valueContainer: () => "!p-0",
            dropdownIndicator: () => "!p-0",
            singleValue: () => "!text-gray !mx-0",
            menuList: () => "!text-xs",
            multiValue: () => "!bg-accent",
            multiValueLabel: () => "!text-white",
            multiValueRemove: () => "hover:!text-red-500 hover:!bg-accent",
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
          isSearchable={false}
          classNamePrefix="select"
          options={venueList}
          onChange={(selectedOption) =>
            handleFilterChange(selectedOption?.label)
          }
        />
      </div>
    </>
  );
};

export default VenueList;
