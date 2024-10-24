// pages/contract-page/index.tsx
import React from "react";

const ContractPage = () => {
  return (
    <div className="container mb-11 mt-24 px-8 md:my-[6.6875rem] lg:px-16 xl:px-[8.125rem]">
      <div className="container  h-auto bg-secondary p-6">
        <p className="font-cormorant  text-[1.875rem] text-dark-gray md:text-[2.25rem]">
          By placing your order, you agree to our company
          <span className="text-black"> Privacy policy</span> and
          <span className="text-black"> Conditions of use</span>.
        </p>

        <div className="mx-auto mt-4 h-[0.0625rem] w-full bg-[#B0B0B0]" />

        <div className="flex justify-between text-black">
          <h2 className="mt-4 font-cormorant text-[2.25rem] md:text-[2.75rem]">
            Order Summary
          </h2>
          <p className="ml-3 mt-4 text-[1.5rem] md:text-[1.625rem]">
            Items (3)
          </p>
        </div>

        <ul className="text-[1.5rem] md:text-[1.625rem]">
          <li className="mt-6 flex justify-between">
            <span className="text-black">Venue</span>
            <span className="text-black">100$</span>
          </li>
          <li className="mt-2 flex justify-between">
            <span className="text-black">Extras</span>
            <span className="text-black">1000$</span>
          </li>
          <li className="px-6">
            <ul className="mt-2">
              <li className="flex justify-between text-dark-gray">
                <span>Extras</span>
                <span>62.23</span>
              </li>
              <li className="flex justify-between text-dark-gray">
                <span>Extras</span>
                <span>62.23</span>
              </li>
              <li className="flex justify-between text-dark-gray">
                <span>Extras</span>
                <span>62.23</span>
              </li>
            </ul>
          </li>
        </ul>

        <div className="mx-auto mt-4 h-[0.0625rem] w-full bg-[#B0B0B0]" />

        <div className="mt-4 flex justify-between">
          <h3 className="text-[2.25rem] text-black md:text-[2.625rem]">
            Order Total:
          </h3>
          <p className="text-[1.5rem] text-black md:text-[1.625rem]">1100$</p>
        </div>
      </div>

      <div className="text-white">
        <h1 className="mt-2 text-center font-cormorant text-[4rem]">
          Contract
        </h1>
        <div>
          <h2 className="my-6 text-[2.25rem] font-semibold md:text-[3rem]">
            Manville Manor Event Space Rental Agreement
          </h2>
          <p className="text-[1.375rem] md:text-[2.25rem]">
            This Event Space Rental Agreement ("Agreement") is entered into on
            [Date] by and between Manville Manor, located at 39 South St,
            Manville, NJ ("Owner"), and [Client's Full Name] ("Client").
          </p>

          <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
            1. Event Details
          </h2>
          <ul className="ml-12  list-disc text-[1.375rem] md:text-[2.25rem]">
            <li>Event Date: [Event Date]</li>
            <li>Event Time: [Start Time] to [End Time]</li>
            <li>
              Event Type: [Type of Event (e.g., Wedding, Corporate Event)]
            </li>
            <li>Number of Guests: [Number of Guests (maximum 82)]</li>
          </ul>

          <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
            2. Rental Fee and Payment Terms
          </h2>

          <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
            <li>
              Rental Fee: The total rental fee for the event space is $[Total
              Amount].
            </li>
            <li>
              Deposit: A non-refundable deposit of $[Deposit Amount] is due upon
              signing this Agreement. This amount will be applied to the total
              rental fee.
            </li>
            <li>
              Final Payment: The remaining balance of $[Remaining Amount] is due
              no later than [Number of Days] days before the event date.
            </li>
            <li>
              Late Payments: Late payments will incur a fee of $[Late Fee] per
              day.
            </li>
          </ul>

          <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
            3. Cancellation Policy
          </h2>
          <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
            <li>Client Cancellation: If the Client cancels the event:</li>
            <li className="ml-10">
              More than [Number of Days] days before the event: [Percentage]% of
              the rental fee will be refunded, minus the deposit.
            </li>
            <li className="ml-10">
              Less than [Number of Days] days before the event: No refund will
              be given.
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
              Client Responsibility: The Client is responsible for any damage to
              the property, facilities, or equipment caused by the Client or
              their guests during the event.
            </li>
            <li>
              Damage Deposit: A refundable damage deposit of $[Amount] is
              required. The deposit will be refunded within [Number of Days]
              days after the event, provided no damage has occurred.
            </li>
            <li>
              Liability for Damage: If damages exceed the damage deposit, the
              Client agrees to pay the additional costs within [Number of Days]
              days of receiving an invoice from the Owner.
            </li>
          </ul>

          <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
            5. Indemnification
          </h2>
          <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
            <li>
              The Client agrees to indemnify, defend, and hold harmless Manville
              Manor, its owners, employees, and agents from and against any and
              all claims, damages, losses, liabilities, and expenses (including
              reasonable attorney's fees) arising from the Client’s use of the
              event space, including but not limited to:
            </li>
            <li className="ml-10">
              Personal injury or property damage occurring on the premises
              during the event.
            </li>
            <li className="ml-10">
              Any claims made by third parties or guests in attendance at the
              event.
            </li>
            <li>
              The Owner shall not be held responsible for any loss, theft, or
              damage to personal property or equipment brought onto the premises
              by the Client or their guests.
            </li>
          </ul>

          <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
            6. Event Conduct
          </h2>

          <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
            <li>
              Compliance with Laws: The Client agrees to comply with all local,
              state, and federal laws, including but not limited to alcohol
              consumption laws, noise ordinances, and occupancy limits.
            </li>
            <li>
              Guest Behavior: The Client is responsible for the behavior of all
              guests. The Owner reserves the right to terminate the event if
              guests engage in illegal activities or disruptive behavior,
              without a refund.
            </li>
          </ul>

          <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
            7. Force Majeure
          </h2>
          <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
            <li>
              The Owner shall not be liable for any failure or delay in
              performing its obligations under this Agreement if such failure or
              delay is due to circumstances beyond its reasonable control,
              including but not limited to acts of God, war, terrorism, or
              government restrictions.
            </li>
          </ul>

          <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
            8. Termination of Agreement
          </h2>
          <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
            <li>
              Breach by Client: The Owner reserves the right to terminate this
              Agreement without notice if the Client breaches any terms of this
              Agreement.
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
              Entire Agreement: This Agreement constitutes the entire agreement
              between the parties and supersedes any prior agreements,
              understandings, or representations.
            </li>
            <li>
              Governing Law: This Agreement shall be governed by and construed
              in accordance with the laws of the State of New Jersey.
            </li>
          </ul>

          <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
            10. Acceptance of Terms
          </h2>
          <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
            <li>
              By signing below, the Client acknowledges that they have read,
              understood, and agree to the terms and conditions outlined in this
              Agreement.
            </li>
          </ul>
          <div className="mt-8  text-[1.375rem] md:text-[2.25rem]">
            <span>Client Signature: ________________________</span>
            <br />
            <span>Date: ________________________</span>
            <br />
            <span>Owner Signature: ________________________</span>
            <br />
            <span>Date: _______________</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPage;