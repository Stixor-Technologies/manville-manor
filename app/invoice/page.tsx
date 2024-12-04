"use client";
import InvoiceCard from "@/components/shared/invoice-card";
import moment, { Moment } from "moment";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";

import "react-datetime/css/react-datetime.css";
import ContractAgreement from "@/components/contract-agreement";
import { Button } from "@/components/button";
import Datetime from "react-datetime";
import Dropzone from "react-dropzone";
import { Field, Form, Formik, useFormikContext } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { postContract } from "@/utils/api-calls";
import { toast } from "react-toastify";
import generatePDF, { Margin } from "react-to-pdf";

interface SignatureDropzoneProps {
  name: string;
  hasError?: boolean;
  isTouched?: boolean;
  errorMessage?: string;
}

const SignatureDropzone: FC<SignatureDropzoneProps> = ({
  name,
  isTouched,
  hasError,
  errorMessage,
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [preview, setPreview] = useState<string>("");

  const allowedTypes = [
    "image/svg+xml",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  const processFile = (file: File | undefined) => {
    if (file && allowedTypes.includes(file.type)) {
      setFieldValue(name, file);
      setFieldTouched(name, true, false);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.currentTarget?.files?.[0];
    processFile(file);
  };

  return (
    <div className="relative w-[22rem] border-b border-dashed border-white">
      <Dropzone
        onDrop={(files) => {
          if (files && files[0]) {
            const file = files[0];
            processFile(file);
          }
        }}
      >
        {({ getRootProps }) => (
          <div {...getRootProps()} className="w-full">
            <div>
              <label htmlFor={name} className="cursor-pointer">
                {preview ? (
                  <Image
                    src={preview}
                    alt="client-signature"
                    width={200}
                    height={200}
                    className="mx-auto max-h-32 max-w-52 object-contain"
                  />
                ) : (
                  <span className="block cursor-pointer bg-white py-2 text-center text-4xl uppercase text-black">
                    DROP SIGNATURE
                  </span>
                )}
              </label>

              <Field
                name={name}
                id={name}
                value={undefined}
                type="file"
                accept=".svg, .png, .jpeg, .jpg"
                className="hidden"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleImageChange(event)
                }
              />
            </div>
          </div>
        )}
      </Dropzone>

      {isTouched && hasError && (
        <p className="absolute mt-1 text-xs italic text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

const InvoicePage = () => {
  const [bookingData, setBookingData] = useState<any>(null);
  const targetRef = useRef<any | null>(null);

  const [isPostingContract, setisPostingContract] = useState<boolean>(false);
  const router = useRouter();

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current: Moment) => {
    return current.isAfter(yesterday);
  };

  const inputProps = {
    id: "dateClient",
    className: `w-full appearance-none bg-transparent text-2xl capitalize text-white outline-none cursor-pointer`,
    readOnly: true,
  };

  // Fetch the invoice data from session storage when the component mounts
  useEffect(() => {
    const bookingData = sessionStorage.getItem("bookingData");
    if (bookingData) {
      setBookingData(JSON.parse(bookingData));
    }
  }, []);

  const submitContract = async () => {
    console.log("inside");

    try {
      setisPostingContract(true);

      if (targetRef?.current) {
        const createPdf = await generatePDF(targetRef, {
          filename: "contract.pdf",
          method: "open",
          page: {
            margin: 2,
          },
        });

        const pp = createPdf.setDisplayMode("fullheight", "continuous");
        const pdfBlob = pp.output("blob");

        const formData = new FormData();
        formData.append("files", pdfBlob);

        console.log("inside", createPdf);

        // const resp = await postContract(bookingData?.id, formData);
        // if (resp) {
        //   toast.success("Booking Updated Contract", {
        //     position: "bottom-right",
        //     autoClose: 2000,
        //     hideProgressBar: true,
        //   });

        //   router.replace("/payment");
        // }
      }
    } catch (error) {
      console.error("Error generating or uploading contract", error);
    } finally {
      setisPostingContract(false);
    }
  };

  return (
    <>
      <div
        ref={targetRef}
        className="pdf-container bg-primary pb-11 pt-24 md:py-[6.6875rem]"
      >
        <table
          // ref={targetRef}
          className=" border-b-8 border-transparent"
        >
          <thead className=" ">
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
                  entered into on [Date] by and between Manville Manor, located
                  at 39 South St, Manville, NJ (&quot;Owner&quot;), and
                  [Client&apos;s Full Name] (&quot;Client&quot;).
                </p>

                <h2 className="pagebreak mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
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

                <ul className=" ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    {`Rental Fee: The total rental fee for the event space is $${bookingData?.invoice?.totalPrice}.`}
                  </li>
                  <li>
                    Deposit: A non-refundable deposit of $[Deposit Amount] is
                    due upon signing this Agreement. This amount will be applied
                    to the total rental fee.
                  </li>
                  <li>
                    Final Payment: The remaining balance of $[Remaining Amount]
                    is due no later than [Number of Days] days before the event
                    date.
                  </li>
                  <li>
                    Late Payments: Late payments will incur a fee of $[Late Fee]
                    per day.
                  </li>
                </ul>

                <h2 className=" mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
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
                    Owner Cancellation: The Owner reserves the right to cancel
                    the event for reasons beyond its control (e.g., natural
                    disasters, venue damage). In such cases, a full refund,
                    including the deposit, will be issued to the Client.
                  </li>
                </ul>

                <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                  4. Damage and Liability
                </h2>
                <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    Client Responsibility: The Client is responsible for any
                    damage to the property, facilities, or equipment caused by
                    the Client or their guests during the event.
                  </li>
                  <li>
                    Damage Deposit: A refundable damage deposit of $[Amount] is
                    required. The deposit will be refunded within [Number of
                    Days] days after the event, provided no damage has occurred.
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
                    against any and all claims, damages, losses, liabilities,
                    and expenses (including reasonable attorney&apos;s fees)
                    arising from the Client&apos;s use of the event space,
                    including but not limited to:
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
                    Guest Behavior: The Client is responsible for the behavior
                    of all guests. The Owner reserves the right to terminate the
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
                    failure or delay is due to circumstances beyond its
                    reasonable control, including but not limited to acts of
                    God, war, terrorism, or government restrictions.
                  </li>
                </ul>

                <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                  8. Termination of Agreement
                </h2>
                <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                  <li>
                    Breach by Client: The Owner reserves the right to terminate
                    this Agreement without notice if the Client breaches any
                    terms of this Agreement.
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
                    By signing below, the Client acknowledges that they have
                    read, understood, and agree to the terms and conditions
                    outlined in this Agreement.
                  </li>
                </ul>
              </div>
            </div>

            {/* <ContractAgreement bookingId={bookingData?.id} targetRef={targetRef} /> */}

            <div className="mt-8 text-[1.375rem] text-white md:text-[2.25rem]">
              <Formik
                initialValues={{
                  clientSignature: "",
                  dateClient: "",
                }}
                onSubmit={submitContract}
                // validationSchema={ContractFormSchema}
              >
                {({ errors, touched, setFieldValue }) => (
                  <>
                    <Form className="flex flex-col gap-10">
                      <div className="flex items-end gap-2 leading-none ">
                        <span>Client Signature:</span>

                        <SignatureDropzone
                          name="clientSignature"
                          hasError={!!errors.clientSignature}
                          isTouched={touched.clientSignature}
                          errorMessage={errors.clientSignature}
                        />
                      </div>

                      <div className="flex items-end gap-2 leading-none ">
                        <span>Date: </span>

                        <div className="w-[22rem] border-b border-dashed border-white text-base text-black">
                          <Datetime
                            className="text-auto"
                            closeOnSelect
                            inputProps={inputProps}
                            isValidDate={disablePastDt}
                            timeFormat={false}
                            dateFormat="DD-MMMM-YYYY"
                            onClose={(dateValue) => {
                              if (
                                dateValue &&
                                (typeof dateValue === "string" ||
                                  moment.isMoment(dateValue))
                              ) {
                                setFieldValue(
                                  "dateClient",
                                  moment(dateValue).toDate(),
                                );
                              }
                            }}
                          />

                          {!!errors?.dateClient && touched?.dateClient && (
                            <p className="absolute mt-1 text-xs italic text-red-600">
                              {errors.dateClient}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-end gap-2 leading-none ">
                        <span>Owner Signature:</span>

                        <div className="w-[22rem] border-b border-dashed border-white text-base text-black">
                          <span className="block bg-white py-2 text-center text-4xl uppercase text-black">
                            Drop Signature
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end gap-2 leading-none ">
                        <span>Date: </span>
                        <div className="w-[22rem] border-b border-dashed border-white text-base text-black" />
                      </div>
                      {/* <Button
                    size={"md"}
                    loading={isPostingContract}
                    disabled={isPostingContract}
                    className="mx-auto mt-4"
                  >
                    Submit Contract
                  </Button> */}
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </thead>
        </table>
      </div>
      <Button
        size={"md"}
        loading={isPostingContract}
        disabled={isPostingContract}
        className="mx-auto mt-4"
        onClick={submitContract}
      >
        Submit Contract
      </Button>
    </>
  );
};

export default InvoicePage;
