"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Arrow from "@/public/assets/icons/arrow-down.svg";
import { faqItems } from "@/utils/utils";
import { cn } from "@/lib/utils";

const FaqItem = ({ title, content }: { title: string; content: string }) => {
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
      className={`mx-auto border-b border-white/10 py-5 text-white transition-all duration-300`}
    >
      <button
        onClick={() => toggleAccordion()}
        className="flex w-full items-start justify-between gap-3 text-left sm:gap-6 md:text-lg"
      >
        <div className="text-[1.375rem] capitalize">
          <span>{title}</span>
        </div>

        <Image
          src={Arrow}
          alt="expand-question"
          className={cn(
            isOpen ? "rotate-180" : "rotate-0",
            "transition-all duration-300 ease-in-out",
          )}
        />
      </button>
      <div
        ref={contentRef}
        className="transition-max-height overflow-hidden duration-500 ease-in-out"
        style={{ maxHeight: height }}
      >
        <p className="pt-6 text-xl text-white">{content}</p>
      </div>
    </div>
  );
};

const Faqsss = () => {
  return (
    <section>
      <h2 className="text-center font-cormorant text-5xl font-bold text-white">
        Frequently asked questions
      </h2>
      <p className="mt-4 text-center text-[1.375rem] text-secondary">
        Can&apos;t find the anwser you&apos;re looking for ? Reach out to
        customer support team.
      </p>

      <div className="mt-[3.75rem] flex flex-col">
        {faqItems?.map((item, index) => (
          <FaqItem key={index} title={item.title} content={item?.content} />
        ))}
      </div>
    </section>
  );
};
export default Faqsss;
