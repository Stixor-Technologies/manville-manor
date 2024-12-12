"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Add from "@/public/assets/icons/add.svg";
import { faqItems } from "@/utils/utils";
import SectionHeader from "@/components/shared/section-header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
      className={`mx-auto w-full border-b border-black px-2.5 py-5 duration-100 sm:py-[3.25rem] md:!px-[3.75rem] xs:px-5 ${isOpen ? "bg-accent text-white" : "bg-milk text-black"} transition-all duration-300`}
    >
      <button
        onClick={() => toggleAccordion()}
        className="flex w-full items-center justify-between gap-3 text-left sm:gap-6 md:text-lg"
      >
        <div className="flex items-center gap-3 uppercase sm:text-4xl md:!gap-[3.25rem] xs:gap-5">
          <span
            className={`text-3xl font-bold md:text-[4rem] xs:text-5xl ${isOpen ? "text-white" : "text-accent"} transition-all duration-300`}
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
        className="transition-max-height overflow-hidden  duration-500 ease-in-out md:pl-[calc(3.25rem+3.25rem)]"
        style={{ maxHeight: height }}
      >
        <p className="pt-6 text-xl text-white">{content}</p>
      </div>
    </div>
  );
};

const Faqs = () => {
  useGSAP(() => {
    gsap.from("[data-animated-faq-container]", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power1",
      scrollTrigger: {
        trigger: "[data-animated-faq-container]",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section>
      <SectionHeader header="FAQ'S" description="Frequently Asked Questions" />

      <div data-animated-faq-container className="mt-8 flex flex-col md:mt-16">
        {faqItems?.map((item, index) => (
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
