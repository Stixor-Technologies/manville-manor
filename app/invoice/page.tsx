"use client";
import InvoiceCard from "@/components/shared/invoice-card";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

import "react-datetime/css/react-datetime.css";
import ContractAgreement from "@/components/contract-agreement";
import { useSearchParams } from "next/navigation";
import { getInvoice } from "@/utils/api-calls";
import Spinner from "@/components/shared/spinner";

const InvoicePage = () => {
  const [bookingData, setBookingData] = useState<any>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const [isLoading, setisLoading] = useState(true);

  const bookingId = searchParams.get("bookingId");

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

  return (
    <>
      {isLoading ? (
        <div className="h-[50vh]">
          <Spinner />
        </div>
      ) : bookingData ? (
        <div
          ref={targetRef}
          className="container bg-primary pb-11 pt-24 md:py-[6.6875rem]"
        >
          <InvoiceCard invoiceData={bookingData?.invoice} />

          <div className="text-white">
            <h1 className="mt-2 text-center font-cormorant text-[4rem]">
              Contract
            </h1>
            <div>
              <h2 className="my-6 text-[2.25rem] font-semibold md:text-[3rem]">
                Manville Manor Event Space Rental Agreement
              </h2>
              <p className="text-[1.375rem] md:text-[2.25rem]">
                This Event Space Rental Agreement (&quot;Agreement&quot;) is
                entered into on [Date] by and between Manville Manor, located at
                39 South St, Manville, NJ (&quot;Owner&quot;), and
                [Client&apos;s Full Name] (&quot;Client&quot;).
              </p>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                1. Event Details
              </h2>
              <ul className="ml-12  list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>{`Event Date: ${moment(bookingData?.date).format("DD-MMMM-YYYY")}`}</li>
                <li>Event Time: [Start Time] to [End Time]</li>
                <li>{`Event Type: ${bookingData?.venue?.venue_name}`}</li>
                <li>
                  {` Number of Guests: ${bookingData?.peopleCount?.numberOfPeople}`}
                </li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                2. Rental Fee and Payment Terms
              </h2>

              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  {`Rental Fee: The total rental fee for the event space is $${bookingData?.invoice?.totalPrice}.`}
                </li>
                <li>
                  Deposit: A non-refundable deposit of $[Deposit Amount] is due
                  upon signing this Agreement. This amount will be applied to
                  the total rental fee.
                </li>
                <li>
                  Final Payment: The remaining balance of $[Remaining Amount] is
                  due no later than [Number of Days] days before the event date.
                </li>
                <li>
                  Late Payments: Late payments will incur a fee of $[Late Fee]
                  per day.
                </li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                3. Cancellation Policy
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>Client Cancellation: If the Client cancels the event:</li>
                <li className="ml-10">
                  More than [Number of Days] days before the event:
                  [Percentage]% of the rental fee will be refunded, minus the
                  deposit.
                </li>
                <li className="ml-10">
                  Less than [Number of Days] days before the event: No refund
                  will be given.
                </li>
                <li>
                  Owner Cancellation: The Owner reserves the right to cancel the
                  event for reasons beyond its control (e.g., natural disasters,
                  venue damage). In such cases, a full refund, including the
                  deposit, will be issued to the Client.
                </li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                4. Damage and Liability
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
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                5. Indemnification
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  The Client agrees to indemnify, defend, and hold harmless
                  Manville Manor, its owners, employees, and agents from and
                  against any and all claims, damages, losses, liabilities, and
                  expenses (including reasonable attorney&apos;s fees) arising
                  from the Client&apos;s use of the event space, including but
                  not limited to:
                </li>
                <li className="ml-10">
                  Personal injury or property damage occurring on the premises
                  during the event.
                </li>
                <li className="ml-10">
                  Any claims made by third parties or guests in attendance at
                  the event.
                </li>
                <li>
                  The Owner shall not be held responsible for any loss, theft,
                  or damage to personal property or equipment brought onto the
                  premises by the Client or their guests.
                </li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                6. Event Conduct
              </h2>

              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  Compliance with Laws: The Client agrees to comply with all
                  local, state, and federal laws, including but not limited to
                  alcohol consumption laws, noise ordinances, and occupancy
                  limits.
                </li>
                <li>
                  Guest Behavior: The Client is responsible for the behavior of
                  all guests. The Owner reserves the right to terminate the
                  event if guests engage in illegal activities or disruptive
                  behavior, without a refund.
                </li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                7. Force Majeure
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  The Owner shall not be liable for any failure or delay in
                  performing its obligations under this Agreement if such
                  failure or delay is due to circumstances beyond its reasonable
                  control, including but not limited to acts of God, war,
                  terrorism, or government restrictions.
                </li>
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
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
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
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
              </ul>

              <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                10. Acceptance of Terms
              </h2>
              <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                <li>
                  By signing below, the Client acknowledges that they have read,
                  understood, and agree to the terms and conditions outlined in
                  this Agreement.
                </li>
              </ul>
            </div>
          </div>

          <ContractAgreement
            bookingId={bookingData?.id}
            targetRef={targetRef}
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
