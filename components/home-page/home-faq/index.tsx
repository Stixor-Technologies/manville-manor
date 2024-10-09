"use client";
import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";
import Add from "@/public/assets/icons/add.svg";
import { homefaqItems } from "@/utils/utils";
import SectionHeader from "@/components/shared/section-header";

const FaqItem = ({
  title,
  content,
  index,
}: {
  index: number;
  title: string;
  content: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef?.current?.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);
  return (
    <div
      className={`mx-auto border-b border-accent px-[3.75rem] py-[3.25rem]  duration-100 ${isOpen ? "bg-accent text-white" : "bg-milk text-black"} transition-all duration-300`}
    >
      <button
        onClick={() => toggleAccordion()}
        className="flex w-full items-start justify-between gap-3 text-left sm:gap-6 md:text-lg"
      >
        <div className="flex gap-[3.25rem] text-4xl uppercase">
          <span
            className={`text-[4rem] font-bold ${isOpen ? "text-white" : "text-accent"} mt-2 transition-all duration-300`}
          >
            {String(index).padStart(2, "0")}
          </span>

          <div>
            <span className="font-semibold">{title}</span>
          </div>
        </div>

        <div
          className={`${isOpen ? "rotate-[135deg] bg-black" : "bg-accent"} shrink-0 rounded-full p-4 transition-all duration-300`}
        >
          <Image src={Add} alt="expand-question" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="transition-max-height overflow-hidden pl-[calc(3.25rem+4rem)] duration-500 ease-in-out"
        style={{ maxHeight: height }}
      >
        <p className="pt-6 text-xl text-white">{content}</p>
      </div>
    </div>
  );
};

const HomeFaqs = () => {
  return (
    <section>
      <SectionHeader header="FAQ'S" description="Frequently Asked Questions" />

      <div className="mt-16 flex flex-col">
        {homefaqItems?.map((item, index) => (
          <FaqItem
            key={index}
            index={index + 1}
            title={item.title}
            content={item?.content}
          />
        ))}
      </div>
    </section>
  );
};
export default HomeFaqs;
