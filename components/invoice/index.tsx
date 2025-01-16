"use client";
import { getInvoice } from "@/utils/api-calls";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ContractAgreement from "./contract-agreement";
import InvoiceCard from "../shared/invoice-card";
import Spinner from "../shared/spinner";

const InvoicePage = () => {
  const [bookingData, setBookingData] = useState<any>(null);
  const searchParams = useSearchParams();
  const [isLoading, setisLoading] = useState(true);

  const bookingId = searchParams.get("bookingId");
  const contractRef = useRef(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (bookingId) {
        try {
          const resp = await getInvoice(Number(bookingId));
          if (resp) {
            setBookingData(resp);
          }
        } catch (error) {
          console.error("error", error);
        } finally {
          setisLoading(false);
        }
      }
    };

    fetchInvoice();
  }, [bookingId]);

  const getEventTime = () => {
    const startTime = moment(bookingData?.date).format("h:mma");
    const startHour = moment(bookingData?.date).hour();
    const endTime = startHour < 16 ? "3:00pm" : "10:30pm";
    return `${startTime} - ${endTime}`;
  };

  return (
    <>
      {isLoading ? (
        <div className="h-[50vh]">
          <Spinner />
        </div>
      ) : bookingData ? (
        <div
          ref={contractRef}
          className="container bg-primary pb-11 pt-24 md:py-[6.6875rem]"
        >
          <InvoiceCard invoiceData={bookingData?.invoice} />

          <div className="mb-28 text-white">
            <h1 className="mt-2 text-center font-cormorant text-[4rem]">
              Contract
            </h1>
            <div>
              <h2 className="my-6 text-[2.25rem] font-semibold md:text-[3rem]">
                Manville Manor Event Space Rental Agreement
              </h2>
              <p className="text-[1.375rem] md:text-[2.25rem]">
                {`This Event Space Rental Agreement is
      entered into on ${moment(bookingData?.date).format("DD-MMMM-YYYY")} by and between Manville Manor, located at
      39 South St, Manville, NJ and ${bookingData?.fullName}.`}
              </p>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                1. Event Details
              </h2>
              <ul className="ml-12  list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>{`Event Date: ${moment(bookingData?.date).format("DD-MMMM-YYYY")}`}</li>
                <li>{`Event Time: ${getEventTime()}`}</li>
                <li>
                  {` Number of Guests: ${bookingData?.adultsCount + bookingData?.childsCount}`}
                </li>
              </ul>

              <div>
                <h2 className="mt-10 text-[1.675rem] font-semibold md:text-[2.55rem]">
                  Booking & Reservation
                </h2>

                <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    A reserved venue requires both confirmed payment and the
                    signing of a venue agreement. Book on website direct is
                    fastest way to ensure your party is reserved as our Calendar
                    is the up to date with availability for day time use and
                    night time events.
                  </li>
                  <li>Person reserving venue must be 25 years and older</li>
                  <li>
                    Fill out your information on booking page allowing you to
                    pick different packages and include any add on as shown.
                  </li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Incidental deposit
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    A $250 incidental deposit will be included in your final
                    bill and refunded within 5 days after your event, provided
                    there is no damage to the venue or its equipment/supplies,
                    and no overtime use.
                  </li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Sales tax -{" "}
                  <span className="font-normal">
                    NJ sales tax of 6.625% will apply to venue rental total.
                  </span>
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    Accepted payment methods: Credit cards, bank transfers,
                    Zelle and certified checks
                  </li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Cancellation and Refunds:
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    100% payment due time of booking and fully refundable with
                    in 90 days
                  </li>
                  <li>
                    Cancellations 45-89 days before: 75% of deposit refunded
                  </li>
                  <li>Cancellations less than 45 days before: No refund</li>
                  <li>
                    For rescheduling, please inform us before the 6-week mark.
                    And will credit towards your new date within one year from
                    the original booking, with applicable rescheduling fees
                  </li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Payment Methods:
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    Zelle, Venmo, Bank Transfer and Credit Card. Note: A 3%
                    credit card processing fee will be added to the payment.
                  </li>
                  <li>Best to book directly thru website</li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Not allowed on our venue premises:
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>Smoking permitted only in designated outdoor areas</li>
                  <li>
                    No glitter or confetti including balloons with confetti in
                    them
                  </li>
                  <li>No use of tape on venue walls.</li>

                  <li>
                    No real flames except for warming food and candles for the
                    event cake. Floating candles allowed as long as they are not
                    exposed flames and in a container.
                  </li>
                  <li>
                    No helium air balloons allowed due to our high ceilings and
                    chandeliers . Regular balloons allowed.
                  </li>

                  <li>No sparklers allowed</li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Capacity & Safety
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>Maximum capacity: 81 guests, 2 Kitchen</li>
                  <li>Fire exits must remain unobstructed</li>
                  <li>Emergency procedures must be followed</li>

                  <li>Right to refuse entry for safety concerns</li>
                  <li>
                    Compliance with all local fire, noise and safety codes
                    required
                  </li>
                </ul>

                <h2 className="mt-10 text-[1.675rem] font-semibold md:text-[2.55rem]">
                  Vendor & Service Requirements
                </h2>

                <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>All vendors must provide proof of insurance</li>
                  <li>Vendor setup/breakdown times must be coordinated</li>
                  <li>
                    Vendors must follow venue loading/unloading procedures
                  </li>
                  <li>Certificate of Insurance required before even</li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Catering
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    Licensed and insured caterers only - (liability insurance
                    required)
                  </li>
                  <li>
                    We can also share some of our set menus from select vendors
                    to provide add on catering food choices to your event.
                  </li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Alcohol
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    Alcohol service must end 30 minutes before event conclusion
                  </li>
                  <li>
                    Professional bartenders required for all alcohol service
                  </li>
                  <li>Proof of liquor liability insurance required</li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Property & Liability
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>Client responsible for guest conduct </li>
                  <li>Damage to venue or equipment will be billed</li>
                  <li>Personal items must be removed after event</li>
                  <li>Venue not responsible for lost/stolen items</li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Sound Regulations
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>Music must comply with local noise ordinances</li>
                  <li>Volume control at management discretion</li>
                  <li>Live music/DJ must provide own equipment</li>
                  <li>All entertainment must end by 10:30 PM</li>
                </ul>

                <h2 className="mt-10 text-base font-semibold md:text-[2.25rem]">
                  Unforeseen Circumstances
                </h2>

                <ul className="ml-12 mt-4 list-disc text-[1.375rem] md:text-[2.25rem]">
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
            </div>
          </div>

          <ContractAgreement
            bookingId={bookingData?.id}
            // contractDate={bookingData?.contractDate}
            // clientSignature={bookingData?.clientSignature?.url}
            bookingData={bookingData}
          />
        </div>
      ) : (
        <div className="flex h-[50vh] items-center justify-center text-3xl text-white">
          <p>No Data Found for this booking</p>
        </div>
      )}
    </>
  );
};

export default InvoicePage;
