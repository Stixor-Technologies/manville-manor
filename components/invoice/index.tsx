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
    const startTime = moment.utc(bookingData?.date).format("h:mma");
    const startHour = moment.utc(bookingData?.date).hour();
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

          <div className="mb-32 text-white">
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

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                2. Cancellation Policy
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  100% payment due time of booking and fully refundable with in
                  90 days
                </li>
                <li>
                  Cancellations 45-89 days before: 75% of deposit refunded
                </li>

                <li className="ml-10">
                  Cancellations less than 45 days before: No refund
                </li>

                <li>
                  For rescheduling, please inform us before the 6-week mark. And
                  will credit towards your new date within one year from the
                  original booking, with applicable rescheduling fees
                </li>
                <li>Credit Card payments are Final and cannot be disputed.</li>
                <li className="ml-10">
                  Owner Cancellation: The Owner reserves the right to cancel the
                  event for reasons beyond its control (e.g., natural disasters,
                  venue damage). In such cases, a full refund, including the
                  deposit, will be issued to the Client.
                </li>
              </ul>

              {/* <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                3. Damage and Liability
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  Client Responsibility: The Client is responsible for any
                  damage to the property, facilities, or equipment caused by the
                  Client or their guests during the event.
                </li>
                <li>
                  Damage Deposit: A refundable damage deposit of $[Amount] is
                  required. The deposit will be refunded within [Number of Days]
                  days after the event, provided no damage has occurred.
                </li>
                <li>
                  Liability for Damage: If damages exceed the damage deposit,
                  the Client agrees to pay the additional costs within [Number
                  of Days] days of receiving an invoice from the Owner.
                </li>
              </ul> */}

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                3. Rules and Regulations
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>Capacity: Maximum capacity is [81] persons</li>
                <li>Hours: All events must end by specified time.</li>
                <li>
                  Setup/Cleanup: - Setup may begin 2 hours before event start
                  time - Cleanup must be completed within 1 hour after event end
                  time
                </li>
                <li>
                  Decorations: - No nails, screws, staples, or penetrating items
                  on walls or floors - No glitter or confetti - No open flames
                  (except catering equipment and birthday candles)
                </li>
                <li>Noise levels must comply with local ordinances</li>
                <li>Smoking & vaping is prohibited inside the building</li>
                <li>Alcohol service must comply with state and local laws</li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                4. Categring and Vendores
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  All vendors must be licensed and insured - Vendor list must be
                  submitted 14 days prior to event - Certificate of Insurance
                  required from all vendors Not allowed on our venue premises:
                  <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                    <li>Smoking permitted only in designated outdoor areas</li>
                    <li>
                      No glitter or confetti including balloons with confetti in
                      them
                    </li>
                    <li>No use of tape on venue walls.</li>
                    <li>
                      No real flames except for warming food and candles for the
                      event cake. Floating candles allowed as long as they are
                      not exposed flames and in a container. And No Sparklers
                    </li>
                  </ul>
                  <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                    Capacity & Safety
                  </h2>
                  <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                    <li>
                      Maximum capacity: 81 guests, 2 Kitchen, Fire exits must
                      remain unobstructed, Emergency procedures must be
                      followed, Right to refuse entry for safety concerns,
                      Compliance with all local fire, noise and safety codes
                      required
                    </li>
                  </ul>
                  <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                    Alcohol
                  </h2>
                  <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                    <li>
                      A licensed and insured bartender is required and service
                      must end 30 minutes before event conclusion
                    </li>
                    <li>
                      Professional bartenders required for all alcohol service
                      and cannot be resold onsite to guests.
                    </li>
                    <li>
                      Proof of liquor liability insurance required , We may add
                      security as needed, based on the event&apos;s nature and
                      timing.
                    </li>
                  </ul>
                  <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                    Property & Liability
                  </h2>
                  <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                    <li>
                      Client responsible for guest conduct and subject to event
                      termination if guests engage in illegal activities or
                      disruptive behavior, without a refund.
                    </li>
                    <li>
                      Damage in excess of damage deposit to venue or equipment
                      will be billed separately with in 3 days of invoice.
                    </li>
                    <li>
                      Venue not responsible for lost/stolen items or damage to
                      personal property or equipment brought onto the premises
                      by the Client or their guests. Sound Regulations
                    </li>
                    <li>
                      Music must comply with local noise ordinances & Volume
                      control at management discretion
                    </li>
                    <li>
                      Live music/DJ must provide own equipment & All
                      entertainment must end by 10:30 PM
                    </li>
                  </ul>
                  <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                    Unforeseen Circumstances
                  </h2>
                  <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                    <li>
                      Venue not liable for circumstances beyond its control
                    </li>
                    <li>
                      Including but not limited to: natural disasters, weather,
                      pandemics, government restrictions
                    </li>
                    <li>Alternative dates will be offered if possible</li>
                    <li>Changes to Agreement</li>
                    <li>Terms subject to change with written notice</li>
                    <li>Disputes resolved through arbitration</li>
                    <li>New Jersey law governs all agreements</li>
                  </ul>
                </li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                5. Indemnification
              </h2>

              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  The Client (Lessee )agrees to indemnify, defend, and hold
                  harmless Manville Manor, its owners, employees, and agents
                  from and against any and all claims, damages, losses,
                  liabilities, and expenses (including reasonable
                  attorney&apos;s fees) arising from the Client&apos;s use of
                  the event space, including but not limited to: Personal injury
                  or property damage occurring on the premises during the event.
                  Any claims made by third parties or guests in attendance at
                  the event.
                </li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                6. Force Majeure
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  Neither party shall be liable for failure to perform due to
                  circumstances beyond reasonable control.
                </li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                7. Governing Law
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  This Agreement shall be governed by the laws of the State of
                  [NJ]. Any amendments to this Agreement must be made in writing
                  and signed by both parties. This Agreement constitutes the
                  entire agreement between the parties and supersedes any prior
                  agreements, understandings, or representations.
                </li>
              </ul>

              {/* <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                8. Termination of Agreement
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  Breach by Client: The Owner reserves the right to terminate
                  this Agreement without notice if the Client breaches any terms
                  of this Agreement.
                </li>
                <li>
                  Refunds upon Termination: In the event of termination due to
                  breach by the Client, no refunds will be issued.
                </li>
              </ul> */}

              {/* <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                9. Miscellaneous
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  Amendments: Any amendments to this Agreement must be made in
                  writing and signed by both parties.
                </li>
                <li>
                  Entire Agreement: This Agreement constitutes the entire
                  agreement between the parties and supersedes any prior
                  agreements, understandings, or representations.
                </li>
                <li>
                  Governing Law: This Agreement shall be governed by and
                  construed in accordance with the laws of the State of New
                  Jersey.
                </li>
              </ul> */}

              {/* <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                10. Acceptance of Terms
              </h2> */}
              <p className="mt-12 text-[1.375rem] md:text-[2.25rem]">
                By signing below, the Client acknowledges that they have read,
                understood, and agree to the terms and conditions outlined in
                this Agreement.
              </p>

              {/* <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>Terms Subject to change ith written notice</li>
                <li>Disputes esolved through arbitration</li>
                <li>New Jersey law governs all agreements</li>
              </ul> */}
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
