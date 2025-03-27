import React from "react";
import HeroGallery from "@/public/assets/gallery/hero-gallery.png";
import Hero from "@/components/shared/hero";
import Link from "next/link";
import Head from "next/head";
import { REDIRECT_URL } from "@/utils/contants";

const Terms = () => {
  return (
    <div>
      <Head>
        <link rel="canonical" href={`${REDIRECT_URL}/term-conditions`} />
      </Head>
      <Hero heroImage={HeroGallery} heroHeading="Terms" />

      <div className="container">
        <div className="my-10 text-white">
          <p className="text-[1.675rem] leading-10 md:text-[2.25rem]">
            Thanks for your interest in hosting your private event with us.
            Please see summary of terms to use venue. Last Updated: January 15,
            2025
          </p>

          <h2 className="mt-10 text-[1.675rem] font-semibold md:text-[2.55rem]">
            Booking & Reservation
          </h2>

          <ul className="ml-12 list-disc text-lg md:text-2xl">
            <li>
              A reserved venue requires both confirmed payment and the signing
              of a venue agreement. Book on website direct is fastest way to
              ensure your party is reserved as our Calendar is the up to date
              with availability for day time use and night time events.
            </li>
            <li>Person reserving venue must be 25 years and older</li>
            <li>
              Fill out your information on booking page allowing you to pick
              different packages and include any add on as shown.
            </li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Incidental deposit
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>
              A $250 incidental deposit will be included in your final bill and
              refunded within 5 days after your event, provided there is no
              damage to the venue or its equipment/supplies, and no overtime
              use.
            </li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Sales tax -{" "}
            <span className="font-normal">
              NJ sales tax of 6.625% will apply to venue rental total.
            </span>
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>
              Accepted payment methods: Credit cards, bank transfers, Zelle and
              certified checks
            </li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Cancellation and Refunds:
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>
              100% payment due time of booking and fully refundable with in 90
              days
            </li>
            <li>Cancellations 45-89 days before: 75% of deposit refunded</li>
            <li>Cancellations less than 45 days before: No refund</li>
            <li>
              For rescheduling, please inform us before the 6-week mark. And
              will credit towards your new date within one year from the
              original booking, with applicable rescheduling fees
            </li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Payment Methods:
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>
              Zelle, Venmo, Bank Transfer and Credit Card. Note: A 3% credit
              card processing fee will be added to the payment.
            </li>
            <li>Best to book directly thru website</li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Not allowed on our venue premises:
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>Smoking permitted only in designated outdoor areas</li>
            <li>
              No glitter or confetti including balloons with confetti in them
            </li>
            <li>No use of tape on venue walls.</li>

            <li>
              No real flames except for warming food and candles for the event
              cake. Floating candles allowed as long as they are not exposed
              flames and in a container.
            </li>
            <li>
              No helium air balloons allowed due to our high ceilings and
              chandeliers . Regular balloons allowed.
            </li>

            <li>No sparklers allowed</li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Capacity & Safety
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>Maximum capacity: 81 guests, 2 Kitchen</li>
            <li>Fire exits must remain unobstructed</li>
            <li>Emergency procedures must be followed</li>

            <li>Right to refuse entry for safety concerns</li>
            <li>
              Compliance with all local fire, noise and safety codes required
            </li>
          </ul>

          <h2 className="mt-10 text-[1.675rem] font-semibold md:text-[2.55rem]">
            Vendor & Service Requirements
          </h2>

          <ul className="ml-12 list-disc text-lg md:text-2xl">
            <li>All vendors must provide proof of insurance</li>
            <li>Vendor setup/breakdown times must be coordinated</li>
            <li>Vendors must follow venue loading/unloading procedures</li>
            <li>Certificate of Insurance required before even</li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Catering
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>
              Licensed and insured caterers only - (liability insurance
              required)
            </li>
            <li>
              We can also share some of our set menus from select vendors to
              provide add on catering food choices to your event.
            </li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Alcohol
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>Alcohol service must end 30 minutes before event conclusion</li>
            <li>Professional bartenders required for all alcohol service</li>
            <li>Proof of liquor liability insurance required</li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Property & Liability
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>Client responsible for guest conduct </li>
            <li>Damage to venue or equipment will be billed</li>
            <li>Personal items must be removed after event</li>
            <li>Venue not responsible for lost/stolen items</li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Sound Regulations
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>Music must comply with local noise ordinances</li>
            <li>Volume control at management discretion</li>
            <li>Live music/DJ must provide own equipment</li>
            <li>All entertainment must end by 10:30 PM</li>
          </ul>

          <h2 className="mt-10 text-base font-semibold md:text-[1.8rem]">
            Unforeseen Circumstances
          </h2>

          <ul className="ml-12 mt-4 list-disc text-lg md:text-2xl">
            <li>Venue not liable for events beyond control</li>
            <li>
              Including but not limited to: natural disasters, pandemics,
              government restrictions
            </li>
            <li>Alternative dates will be offered if possible</li>
            <li>Changes to Agreement</li>
            <li>Terms subject to change with written notice</li>
            <li>Disputes resolved through arbitration</li>
            <li>New Jersey law governs all agreements</li>
          </ul>
        </div>

        <p className="mb-20 text-lg text-white md:text-2xl">
          If any questions, kindly call{" "}
          <Link className=" underline" href={"tel:+732-985-5363"}>
            732-985-5363
          </Link>{" "}
          or use link to contact us
        </p>
      </div>
    </div>
  );
};

export default Terms;
