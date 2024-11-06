import React from "react";
import Image from "next/image";
import Hero from "@/components/shared/hero";
import AboutHero from "@/public/assets/about/about-hero.png";
import ContactBlob from "@/public/assets/contact-blob.png";
import BookingHandler from "@/components/booking/booking-handler";

const Booking = () => {
  return (
    <>
      <Hero heroImage={AboutHero} heroHeading="Booking" />
      <section className="container my-11 rounded-md border border-accent md:rounded-none  md:border-none">
        <div className="border-accent md:rounded-md md:border md:p-4">
          <div className="relative overflow-hidden rounded-xl bg-accent p-10 text-white">
            <div className="relative z-10 mb-32 text-center sm:mb-0 sm:max-w-96 sm:text-left">
              <h2 className="font-cormorant text-5xl">Let's Book Your Venue</h2>
              <p className="mt-5 text-xl">
                Create a Event That no one Can forget
              </p>
            </div>

            <Image
              src={ContactBlob}
              alt="contact-blob"
              width={300}
              className="absolute -bottom-[40%] -right-[8%]"
            />
          </div>

          <BookingHandler />
        </div>
      </section>
    </>
  );
};

export default Booking;
