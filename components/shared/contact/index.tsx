"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ContactFormSchema } from "@/utils/formik-schema";
import { Form, Formik } from "formik";
import Email from "@/public/assets/icons/email.svg";
import Phone from "@/public/assets/icons/phone.svg";
import Marker from "@/public/assets/icons/marker.svg";
import Send from "@/public/assets/icons/send.svg";
import Link from "next/link";
import Input from "@/components/booking/input";

import { Button } from "@/components/button";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type FormValue = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const queries = ["Venues", "Birthday", "Weddings"];
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  useGSAP(() => {
    const contactSection = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-animated-contact-text]",
        start: "top 85%",
      },
    });

    contactSection.from("[data-animated-contact-text]", {
      opacity: 0,
      y: 50,
      ease: "power1",
      duration: 0.8,
    });
    contactSection.from(
      "[data-animated-contact-details]",
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power1",
        stagger: 0.3,
      },
      0.3,
    );

    contactSection.from(
      "[data-animated-contact-form]",
      {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power1",
      },
      ">-1.5",
    );
  }, []);

  const onSubmit = async (values: FormValue) => {
    try {
      console.log(values);
      // const emailTemplate = `<div>
      //         <p>New inquiry from: ${values?.name} - ${values?.email} </p>
      //         <p>Message: ${values.message} </p>
      //         </div>`;
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleQueryChange = (selectedItem: string) => {
    setSelectedQuery(selectedItem);
  };

  return (
    <section className="grid grid-cols-1 gap-10 md:grid-cols-[0.66fr,1fr] md:grid-rows-[auto,1fr] lg:-mr-1.5 xl:gap-x-28 xl:gap-y-11">
      <h4
        data-animated-contact-text
        className="text-center font-cormorant text-[2rem] font-bold leading-tight text-white sm:text-5xl md:text-left"
      >
        Let&apos;s discuss <br className="hidden md:block" /> on something{" "}
        <span className="text-accent">cool</span> together
      </h4>

      <div
        data-animated-contact-form
        className="row-span-2 rounded-sm bg-[#EEEEEE] px-4 py-12 sm:px-6"
      >
        <span className="block text-center text-[1.375rem] font-medium text-accent sm:text-left">
          I&apos;m interested in...
        </span>

        <div className="mb-8 mt-6 flex flex-col gap-4 xs:mb-16 xs:flex-row">
          {queries?.map((item) => (
            <div key={item} className="flex-1">
              <input
                id={`${item}`}
                type="radio"
                name="query"
                className="peer hidden"
                onChange={() => handleQueryChange(item)}
                checked={selectedQuery === item}
              />
              <label
                htmlFor={`${item}`}
                className={`block cursor-pointer rounded-sm border-2 border-accent/30 p-4 text-center leading-none text-accent/30 transition-all duration-300 ease-in-out hover:bg-accent hover:text-white peer-checked:bg-accent peer-checked:text-white`}
              >
                {item}
              </label>
            </div>
          ))}
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={ContactFormSchema}
        >
          {({ errors, touched }) => (
            <>
              <Form>
                <div className="space-y-16">
                  {/* <Input
                    as="input"
                    hasError={errors.name}
                    isTouched={touched.name}
                    name={"name"}
                    placeholder={"Your name"}
                    errorMessage={errors.name}
                  /> */}

                  <Input
                    // as="input"
                    hasError={!!errors.name}
                    isTouched={touched.name}
                    name={"name"}
                    placeholder={"Your name"}
                    errorMessage={errors.name}
                  />

                  <Input
                    // as="input"
                    hasError={!!errors.email}
                    isTouched={touched.email}
                    name={"email"}
                    placeholder={"Your email"}
                    errorMessage={errors.email}
                  />

                  <Input
                    as="textarea"
                    hasError={!!errors.message}
                    isTouched={touched.message}
                    name={"message"}
                    placeholder={"Your message"}
                    errorMessage={errors.message}
                  />
                </div>

                <Button className="mt-12 gap-4" size={"md"}>
                  <Image src={Send} alt="send-message-icon" />
                  Send Mesasge
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </div>

      <div className="space-y-6 text-white">
        <Link
          href={"mailto:SaulDesign@gmail.com"}
          className="flex gap-4 p-6 text-xl"
          data-animated-contact-details
        >
          <Image src={Email} alt="email-icon" />
          <span>SaulDesign@gmail.com</span>
        </Link>

        <Link
          href={"tel:+123 456 789"}
          className="flex gap-4 rounded-2xl border-2 border-accent bg-accent/50 p-6 text-xl"
          data-animated-contact-details
        >
          <Image src={Phone} alt="call-icon" />
          <span>+123 456 789</span>
        </Link>

        <Link
          href={"mailto:SaulDesign@gmail.com"}
          className="flex gap-4 p-6 text-xl"
          data-animated-contact-details
        >
          <Image src={Marker} alt="location-icon" />
          <span>123 Street 456 House</span>
        </Link>
      </div>
    </section>
  );
};

export default Contact;
