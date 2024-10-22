"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ContactFormSchema } from "@/utils/formik-schema";
import { Form, Formik, FormikHelpers } from "formik";
import Input from "@/components/shared/input";
import Email from "@/public/assets/icons/email.svg";
import Phone from "@/public/assets/icons/phone.svg";
import Marker from "@/public/assets/icons/marker.svg";
import Send from "@/public/assets/icons/send.svg";
import Link from "next/link";
import { Button } from "@/components/button";

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

  const onSubmit = async (
    values: FormValue,
    formikHelpers: FormikHelpers<FormValue>,
  ) => {
    try {
      const emailTemplate = `<div>
              <p>New inquiry from: ${values?.name} - ${values?.email} </p>
              <p>Message: ${values.message} </p>
              </div>`;
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleQueryChange = (selectedItem: string) => {
    setSelectedQuery(selectedItem);
  };

  return (
    <section className="flex gap-10 lg:-mr-1.5 xl:gap-28">
      <div className="w-full max-w-[21.25rem] text-white xl:max-w-[26.25rem]">
        <h4 className="font-cormorant text-5xl font-bold leading-tight">
          Let's discuss <br /> on something{" "}
          <span className="text-accent">cool</span> together
        </h4>

        <div className="mt-11 space-y-6">
          <Link
            href={"mailto:SaulDesign@gmail.com"}
            className="flex gap-4 p-6 text-xl"
          >
            <Image src={Email} alt="email-icon" />
            <span>SaulDesign@gmail.com</span>
          </Link>

          <Link
            href={"tel:+123 456 789"}
            className="flex gap-4 rounded-2xl border-2 border-accent bg-accent/50 p-6 text-xl"
          >
            <Image src={Phone} alt="call-icon" />
            <span>+123 456 789</span>
          </Link>

          <Link
            href={"mailto:SaulDesign@gmail.com"}
            className="flex gap-4 p-6 text-xl"
          >
            <Image src={Marker} alt="location-icon" />
            <span>123 Street 456 House</span>
          </Link>
        </div>
      </div>
      <div className="flex-1 rounded-sm bg-white px-6 py-12">
        <span className="text-[1.375rem] font-medium text-accent">
          I'm interested in...
        </span>

        <div className="mb-16 mt-6 flex gap-4">
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
                  <Input
                    as="input"
                    hasError={errors.name}
                    isTouched={touched.name}
                    name={"name"}
                    placeholder={"Your name"}
                    errorMessage={errors.name}
                  />

                  <Input
                    as="input"
                    hasError={errors.email}
                    isTouched={touched.email}
                    name={"email"}
                    placeholder={"Your email"}
                    errorMessage={errors.email}
                  />

                  <Input
                    as="textarea"
                    hasError={errors.message}
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
    </section>
  );
};

export default Contact;