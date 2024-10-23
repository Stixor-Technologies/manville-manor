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
      className={`xs:px-5 mx-auto border-b border-accent px-2.5 py-5 duration-100 sm:py-[3.25rem] md:px-[3.75rem] ${isOpen ? "bg-accent text-white" : "bg-milk text-black"} transition-all duration-300`}
    >
      <button
        onClick={() => toggleAccordion()}
        className="flex w-full items-center justify-between gap-3 text-left sm:gap-6 md:text-lg"
      >
        <div className="xs:gap-5 flex items-center gap-3 uppercase sm:text-4xl md:gap-[3.25rem]">
          <span
            className={`xs:text-5xl text-3xl font-bold md:text-[4rem] ${isOpen ? "text-white" : "text-accent"} transition-all duration-300`}
          >
            {String(index).padStart(2, "0")}
          </span>

          <div>
            <span className="font-semibold">{title}</span>
          </div>
        </div>

        <div
          className={`${isOpen ? "rotate-[135deg] bg-black" : "bg-accent"} shrink-0 rounded-full p-2 transition-all duration-300 md:p-4`}
        >
          <Image src={Add} alt="expand-question" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="transition-max-height overflow-hidden  duration-500 ease-in-out md:pl-[calc(3.25rem+4rem)]"
        style={{ maxHeight: height }}
      >
        <p className="pt-6 text-xl text-white">{content}</p>
      </div>
    </div>
  );
};

const Faqs = () => {
  return (
    <section>
      <SectionHeader header="FAQ'S" description="Frequently Asked Questions" />

      <div className="mt-8 flex flex-col md:mt-16">
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
export default Faqs;
