// "use client";
// import { getInvoice } from "@/utils/api-calls";
// import moment from "moment";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import ContractAgreement from "./contract-agreement";
// import InvoiceCard from "../shared/invoice-card";
// import Spinner from "../shared/spinner";

// const InvoicePage = () => {
//   const [bookingData, setBookingData] = useState<any>(null);
//   const searchParams = useSearchParams();
//   const [isLoading, setisLoading] = useState(true);

//   const bookingId = searchParams.get("bookingId");
//   const contractRef = useRef(null);

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       if (bookingId) {
//         try {
//           const resp = await getInvoice(Number(bookingId));
//           if (resp) {
//             setBookingData(resp);
//           }
//         } catch (error) {
//           console.error("error", error);
//         } finally {
//           setisLoading(false);
//         }
//       }
//     };

//     fetchInvoice();
//   }, [bookingId]);

//   return (
//     <>
//       {isLoading ? (
//         <div className="h-[50vh]">
//           <Spinner />
//         </div>
//       ) : bookingData ? (
//         <div
//           ref={contractRef}
//           className="container bg-primary pb-11 pt-24 md:py-[6.6875rem]"
//         >
//           <InvoiceCard invoiceData={bookingData?.invoice} />

// <div className="text-white">
//   <h1 className="mt-2 text-center font-cormorant text-[4rem]">
//     Contract
//   </h1>
//   <div>
//     <h2 className="my-6 text-[2.25rem] font-semibold md:text-[3rem]">
//       Manville Manor Event Space Rental Agreement
//     </h2>
//     <p className="text-[1.375rem] md:text-[2.25rem]">
//       {`This Event Space Rental Agreement is
//       entered into on [Date] by and between Manville Manor, located at
//       39 South St, Manville, NJ and ${bookingData?.fullName}.`}
//     </p>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       1. Event Details
//     </h2>
//     <ul className="ml-12  list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>{`Event Date: ${moment(bookingData?.date).format("DD-MMMM-YYYY")}`}</li>
//       <li>{`Event Time: ${moment(bookingData?.date).format("h:mma")}`}</li>
//       <li>
//         {` Number of Guests: ${bookingData?.adultsCount + bookingData?.childsCount}`}
//       </li>
//     </ul>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       2. Rental Fee and Payment Terms
//     </h2>

//     <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>
//         {`Rental Fee: The total rental fee for the event space is $${bookingData?.invoice?.totalPrice}.`}
//       </li>
//       <li>
//         Deposit: A non-refundable deposit of $250 is due upon signing
//         this Agreement. This amount will be applied to the total
//         rental fee.
//       </li>
//       <li>
//         Final Payment: The remaining balance of $[Remaining Amount] is
//         due no later than [Number of Days] days before the event date.
//       </li>
//       <li>
//         Late Payments: Late payments will incur a fee of $[Late Fee]
//         per day.
//       </li>
//     </ul>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       3. Cancellation Policy
//     </h2>
//     <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>Client Cancellation: If the Client cancels the event:</li>
//       <li className="ml-10">
//         More than [Number of Days] days before the event:
//         [Percentage]% of the rental fee will be refunded, minus the
//         deposit.
//       </li>
//       <li className="ml-10">
//         Less than [Number of Days] days before the event: No refund
//         will be given.
//       </li>
//       <li>
//         Owner Cancellation: The Owner reserves the right to cancel the
//         event for reasons beyond its control (e.g., natural disasters,
//         venue damage). In such cases, a full refund, including the
//         deposit, will be issued to the Client.
//       </li>
//     </ul>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       4. Damage and Liability
//     </h2>
//     <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>
//         Client Responsibility: The Client is responsible for any
//         damage to the property, facilities, or equipment caused by the
//         Client or their guests during the event.
//       </li>
//       <li>
//         Damage Deposit: A refundable damage deposit of $[Amount] is
//         required. The deposit will be refunded within [Number of Days]
//         days after the event, provided no damage has occurred.
//       </li>
//       <li>
//         Liability for Damage: If damages exceed the damage deposit,
//         the Client agrees to pay the additional costs within [Number
//         of Days] days of receiving an invoice from the Owner.
//       </li>
//     </ul>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       5. Indemnification
//     </h2>
//     <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>
//         The Client agrees to indemnify, defend, and hold harmless
//         Manville Manor, its owners, employees, and agents from and
//         against any and all claims, damages, losses, liabilities, and
//         expenses (including reasonable attorney&apos;s fees) arising
//         from the Client&apos;s use of the event space, including but
//         not limited to:
//       </li>
//       <li className="ml-10">
//         Personal injury or property damage occurring on the premises
//         during the event.
//       </li>
//       <li className="ml-10">
//         Any claims made by third parties or guests in attendance at
//         the event.
//       </li>
//       <li>
//         The Owner shall not be held responsible for any loss, theft,
//         or damage to personal property or equipment brought onto the
//         premises by the Client or their guests.
//       </li>
//     </ul>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       6. Event Conduct
//     </h2>

//     <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>
//         Compliance with Laws: The Client agrees to comply with all
//         local, state, and federal laws, including but not limited to
//         alcohol consumption laws, noise ordinances, and occupancy
//         limits.
//       </li>
//       <li>
//         Guest Behavior: The Client is responsible for the behavior of
//         all guests. The Owner reserves the right to terminate the
//         event if guests engage in illegal activities or disruptive
//         behavior, without a refund.
//       </li>
//     </ul>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       7. Force Majeure
//     </h2>
//     <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>
//         The Owner shall not be liable for any failure or delay in
//         performing its obligations under this Agreement if such
//         failure or delay is due to circumstances beyond its reasonable
//         control, including but not limited to acts of God, war,
//         terrorism, or government restrictions.
//       </li>
//     </ul>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       8. Termination of Agreement
//     </h2>
//     <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>
//         Breach by Client: The Owner reserves the right to terminate
//         this Agreement without notice if the Client breaches any terms
//         of this Agreement.
//       </li>
//       <li>
//         Refunds upon Termination: In the event of termination due to
//         breach by the Client, no refunds will be issued.
//       </li>
//     </ul>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       9. Miscellaneous
//     </h2>
//     <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>
//         Amendments: Any amendments to this Agreement must be made in
//         writing and signed by both parties.
//       </li>
//       <li>
//         Entire Agreement: This Agreement constitutes the entire
//         agreement between the parties and supersedes any prior
//         agreements, understandings, or representations.
//       </li>
//       <li>
//         Governing Law: This Agreement shall be governed by and
//         construed in accordance with the laws of the State of New
//         Jersey.
//       </li>
//     </ul>

//     <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
//       10. Acceptance of Terms
//     </h2>
//     <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
//       <li>
//         By signing below, the Client acknowledges that they have read,
//         understood, and agree to the terms and conditions outlined in
//         this Agreement.
//       </li>
//     </ul>
//   </div>
// </div>

//           <ContractAgreement
//             bookingId={bookingData?.id}
//             contractDate={bookingData?.contractDate}
//             clientSignature={bookingData?.clientSignature?.url}
//             ref={contractRef}
//           />
//         </div>
//       ) : (
//         <div className="flex h-[50vh] items-center justify-center text-3xl text-white">
//           <p>No Data Found for this booking</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default InvoicePage;

"use client";
import InvoiceCard from "@/components/shared/invoice-card";
import moment, { Moment } from "moment";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import "react-datetime/css/react-datetime.css";
// import ContractAgreement from "@/components/contract-agreement";
import { Button } from "@/components/button";
import Datetime from "react-datetime";
import Dropzone from "react-dropzone";
import { Field, Form, Formik, useFormikContext } from "formik";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { getInvoice, postContract } from "@/utils/api-calls";
import { toast } from "react-toastify";
import generatePDF, { Margin } from "react-to-pdf";
import ContractTable from "./contract-table";
import Loading from "@/app/blogs/[id]/loading";
import Spinner from "../shared/spinner";

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

  const searchParams = useSearchParams();
  const [isLoading, setisLoading] = useState(true);
  const bookingId = searchParams.get("bookingId");
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

  // const submitContract = async () => {
  //   console.log("inside");

  //   try {
  //     setisPostingContract(true);

  //     if (targetRef?.current) {
  //       targetRef?.current?.classList.add("!text-black");
  //       const createPdf = await generatePDF(targetRef, {
  //         filename: "contract.pdf",
  //         method: "save",
  //         page: {
  //           margin: Margin.SMALL,
  //         },
  //       });

  //       const pp = createPdf.setDisplayMode("fullheight", "continuous");
  //       const pdfBlob = pp.output("blob");
  //       targetRef?.current?.classList.remove("!text-black");

  //       // const formData = new FormData();
  //       // formData.append("files", pdfBlob);

  //       // console.log("inside", createPdf);

  //       // const reader = new FileReader();

  //       // reader.readAsDataURL(pdfBlob);
  //       // reader.onloadend = async () => {
  //       //   const base64String = reader.result?.toString().split(",")[1];

  //       //   const emailTemplate = `<div>
  //       // <p>This is the contract for Booking Id: ${bookingData?.id} </p>
  //       // <p>Contact Information: ${bookingData?.fullName} - ${bookingData?.email} </p>
  //       // </div>`;

  //       //   const res = await fetch("/api/contract-send", {
  //       //     headers: {
  //       //       "Content-Type": "application/json",
  //       //     },
  //       //     method: "POST",
  //       //     body: JSON.stringify({
  //       //       bookingId: bookingData?.id,
  //       //       fileName: `${bookingData?.fullName}-contract.pdf`,
  //       //       fileData: base64String,
  //       //       mimeType: "application/pdf",
  //       //       htmlContent: emailTemplate,
  //       //     }),
  //       //   });
  //       //   const data = await res.json();
  //       //   if (data === 202) {
  //       //     toast.success("Contract has been sent to owner", {
  //       //       position: "bottom-right",
  //       //     });
  //       //     setisPostingContract(false);
  //       //   } else {
  //       //     toast.error("Error sending Contract", {
  //       //       position: "bottom-right",
  //       //     });
  //       //     setisPostingContract(false);
  //       //   }

  //       // const resp = await postContract(bookingData?.id, formData);
  //       // if (resp) {
  //       //   toast.success("Booking Updated Contract", {
  //       //     position: "bottom-right",
  //       //     autoClose: 2000,
  //       //     hideProgressBar: true,
  //       //   });

  //       //   // router.replace("/payment");
  //       // }
  //       // };
  //     }
  //   } catch (error) {
  //     console.error("Error generating or sending contract", error);
  //     setisPostingContract(false);
  //   }
  //   // finally {
  //   //   setisPostingContract(false);
  //   // }
  // };

  // const submitContract = async (values: any) => {
  //   console.log("Generating Contract...");

  //   try {
  //     setisPostingContract(true);

  //     const convertFileToBase64 = (file: File): Promise<string> => {
  //       return new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = () => resolve(reader.result as string);
  //         reader.onerror = (error) => reject(error);
  //       });
  //     };

  //     // Generate PDF using pdf-lib
  //     const pdfDoc = await PDFDocument.create();
  //     const page = pdfDoc.addPage([600, 800]);
  //     const { width, height } = page.getSize();
  //     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  //     const titleFontSize = 24;
  //     const bodyFontSize = 12;
  //     const textColor = rgb(0, 0, 0); // Black text

  //     // Title Section
  //     page.drawText("Contract", {
  //       x: width / 2 - 50,
  //       y: height - 50,
  //       size: titleFontSize,
  //       font,
  //       color: textColor,
  //     });

  //     // Contract Details
  //     page.drawText(`Manville Manor Event Space Rental Agreement`, {
  //       x: 50,
  //       y: height - 100,
  //       size: 16,
  //       font,
  //       color: textColor,
  //     });

  //     page.drawText(
  //       `This Event Space Rental Agreement is entered into on [Date] by and between Manville Manor,
  //       located at 39 South St, Manville, NJ and ${bookingData?.fullName}.`,
  //       {
  //         x: 50,
  //         y: height - 150,
  //         size: bodyFontSize,
  //         font,
  //         color: textColor,
  //         lineHeight: 18,
  //       },
  //     );

  //     // Event Details Section
  //     page.drawText("1. Event Details", { x: 50, y: height - 200, size: 14 });
  //     page.drawText(
  //       `• Event Date: ${moment(bookingData?.date).format("DD-MMMM-YYYY")}`,
  //       {
  //         x: 60,
  //         y: height - 230,
  //         size: bodyFontSize,
  //       },
  //     );
  //     page.drawText(
  //       `• Event Time: ${moment(bookingData?.date).format("h:mma")}`,
  //       {
  //         x: 60,
  //         y: height - 250,
  //         size: bodyFontSize,
  //       },
  //     );

  //     page.drawText(
  //       `• Number of Guests: ${bookingData?.adultsCount + bookingData?.childsCount}`,
  //       {
  //         x: 60,
  //         y: height - 270,
  //         size: bodyFontSize,
  //       },
  //     );

  //     // Rental Fee Section
  //     page.drawText("2. Rental Fee and Payment Terms", {
  //       x: 50,
  //       y: height - 310,
  //       size: 14,
  //     });
  //     page.drawText(
  //       `• Rental Fee: The total rental fee for the event space is $${bookingData?.invoice?.totalPrice}.`,
  //       {
  //         x: 60,
  //         y: height - 340,
  //         size: bodyFontSize,
  //       },
  //     );
  //     page.drawText(
  //       `• Final Payment: The remaining balance of $[Remaining Amount] is due no later than
  //       [Number of Days] days before the event date.`,
  //       {
  //         x: 60,
  //         y: height - 360,
  //         size: bodyFontSize,
  //         lineHeight: 18,
  //       },
  //     );

  //     page.drawText(
  //       `• Late Payments: Late payments will incur a fee of $[Late Fee] per day.`,
  //       {
  //         x: 60,
  //         y: height - 395,
  //         size: bodyFontSize,
  //       },
  //     );

  //     // Cancellation Policy
  //     page.drawText("3. Cancellation Policy", {
  //       x: 50,
  //       y: height - 430,
  //       size: 14,
  //     });

  //     page.drawText(`• Client Cancellation: If the Client cancels the event:`, {
  //       x: 60,
  //       y: height - 450,
  //       size: bodyFontSize,
  //     });

  //     page.drawText(
  //       `• More than [Number of Days] days before the event: [Percentage]% of the rental fee will be
  //        refunded, minus the deposit.`,
  //       {
  //         x: 70,
  //         y: height - 470,
  //         size: bodyFontSize,
  //         lineHeight: 18,
  //       },
  //     );

  //     page.drawText(
  //       `• Less than [Number of Days] days before the event: No refund will be given`,
  //       {
  //         x: 70,
  //         y: height - 505,
  //         size: bodyFontSize,
  //       },
  //     );

  //     page.drawText(
  //       `• Owner Cancellation: The Owner reserves the right to cancel the event for reasons
  //        beyond its control (e.g., natural disasters, venue damage). In such cases, a full refund,
  //         including the deposit, will be issued to the Client`,
  //       {
  //         x: 60,
  //         y: height - 530,
  //         size: bodyFontSize,
  //         lineHeight: 18,
  //       },
  //     );

  //     // Damage and Liability
  //     page.drawText("4. Damage and Liability", {
  //       x: 50,
  //       y: height - 600,
  //       size: 14,
  //     });

  //     page.drawText(
  //       `• Client Responsibility: The Client is responsible for any damage to the property, facilities,
  //        or equipment caused by the Client or their guests during the event.`,
  //       {
  //         x: 60,
  //         y: height - 630,
  //         size: bodyFontSize,
  //         lineHeight: 18,
  //       },
  //     );

  //     page.drawText(
  //       `• Damage Deposit: A refundable damage deposit of $[Amount] is required. The deposit will be
  //        refunded within [Number of Days] days after the event, provided no damage has occurred.`,
  //       {
  //         x: 60,
  //         y: height - 670,
  //         size: bodyFontSize,
  //         lineHeight: 18,
  //       },
  //     );

  //     page.drawText(
  //       `• Liability for Damage: If damages exceed the damage deposit, the Client agrees to pay the
  //        additional costs within [Number of Days] days of receiving an invoice from the Owner.`,
  //       {
  //         x: 60,
  //         y: height - 710,
  //         size: bodyFontSize,
  //         lineHeight: 18,
  //       },
  //     );

  //     page.drawText("4. Indemnification", {
  //       x: 50,
  //       y: height - 770,
  //       size: 14,
  //     });

  //     page.drawText(
  //       `• The Client agrees to indemnify, defend, and hold harmless Manville Manor, its owners,
  //        employees, and agents from and against any and all claims, damages, losses, liabilities, and
  //         expenses (including reasonable attorney's fees) arising from the Client's use of the event
  //          space, including but not limited to:`,
  //       {
  //         x: 60,
  //         y: height - 800,
  //         size: bodyFontSize,
  //         lineHeight: 18,
  //       },
  //     );

  //     // Section for Signatures
  //     // page.drawText("Client Signature:", { x: 50, y: height - 570, size: 14 });
  //     // page.drawText(`Date: ${values.dateClient}`, {
  //     //   x: 50,
  //     //   y: height - 590,
  //     //   size: bodyFontSize,
  //     // });

  //     // page.drawText("Owner Signature:", { x: 50, y: height - 620, size: 14 });
  //     // page.drawText(`Date: ______________________`, {
  //     //   x: 50,
  //     //   y: height - 660,
  //     //   size: bodyFontSize,
  //     // });

  //     console.log("values.clientSignature", values);
  //     // Embed Client Signature Image (if exists)
  //     // if (values.clientSignature) {
  //     //   const base64String = await convertFileToBase64(values.clientSignature);
  //     //   const signatureImage = await pdfDoc.embedPng(base64String);
  //     //   const sigDims = signatureImage.scale(0.4); // Scale the signature

  //     //   page.drawImage(signatureImage, {
  //     //     x: 180,
  //     //     y: height - 700,
  //     //     width: sigDims.width,
  //     //     height: sigDims.height,
  //     //   });
  //     // }

  //     // if (values.clientSignature) {
  //     //   const base64String = await convertFileToBase64(values.clientSignature);
  //     //   const signatureImage = await pdfDoc.embedPng(base64String);

  //     //   // Max dimensions for the signature
  //     //   const maxWidth = 150; // Reduce width to 150px
  //     //   const maxHeight = 60; // Reduce height to 60px
  //     //   let scaledWidth = signatureImage.width;
  //     //   let scaledHeight = signatureImage.height;

  //     //   // Maintain aspect ratio
  //     //   if (
  //     //     signatureImage.width > maxWidth ||
  //     //     signatureImage.height > maxHeight
  //     //   ) {
  //     //     const scaleFactor = Math.min(
  //     //       maxWidth / signatureImage.width,
  //     //       maxHeight / signatureImage.height,
  //     //     );
  //     //     scaledWidth = signatureImage.width * scaleFactor;
  //     //     scaledHeight = signatureImage.height * scaleFactor;
  //     //   }

  //     //   // Draw Signature Image
  //     //   page.drawImage(signatureImage, {
  //     //     x: 180,
  //     //     y: height - 690, // Adjust Y position to align below "Client Signature"
  //     //     width: scaledWidth,
  //     //     height: scaledHeight,
  //     //   });

  //     //   // Optional: Border around signature
  //     //   // page.drawRectangle({
  //     //   //   x: 178,
  //     //   //   y: height - 522,
  //     //   //   width: scaledWidth + 4,
  //     //   //   height: scaledHeight + 4,
  //     //   //   borderColor: rgb(0, 0, 0),
  //     //   //   borderWidth: 1,
  //     //   // });
  //     // }

  //     // Save PDF to Blob
  //     const pdfBytes = await pdfDoc.save();
  //     const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

  //     // Open PDF in New Tab
  //     const pdfUrl = URL.createObjectURL(pdfBlob);
  //     window.open(pdfUrl, "_blank");

  //     // Convert Blob to Base64 for Email Attachment
  //     const base64String = await blobToBase64(pdfBlob);

  //     // Email Content
  //     const emailTemplate = `
  //       <div>
  //         <p>This is the contract for Booking Id: ${bookingData?.id}</p>
  //         <p>Contact Information: ${bookingData?.fullName} - ${bookingData?.email}</p>
  //       </div>
  //     `;

  //     // Send Contract via API
  //     // const res = await fetch("/api/contract-send", {
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   method: "POST",
  //     //   body: JSON.stringify({
  //     //     bookingId: bookingData?.id,
  //     //     fileName: `${bookingData?.fullName}-contract.pdf`,
  //     //     fileData: base64String,
  //     //     mimeType: "application/pdf",
  //     //     htmlContent: emailTemplate,
  //     //   }),
  //     // });

  //     // const data = await res.json();
  //     // if (data === 202) {
  //     //   toast.success("Contract has been sent to owner", {
  //     //     position: "bottom-right",
  //     //   });
  //     // } else {
  //     //   toast.error("Error sending Contract", {
  //     //     position: "bottom-right",
  //     //   });
  //     // }
  //   } catch (error) {
  //     console.error("Error generating or sending contract", error);
  //   } finally {
  //     setisPostingContract(false);
  //   }
  // };

  // const submitContract = async (values: any) => {
  //   console.log("Generating Contract...");

  //   try {
  //     setisPostingContract(true);

  //     const convertFileToBase64 = (file: File): Promise<string> => {
  //       return new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = () => resolve(reader.result as string);
  //         reader.onerror = (error) => reject(error);
  //       });
  //     };

  //     // Generate PDF using pdf-lib
  //     const pdfDoc = await PDFDocument.create();
  //     let page = pdfDoc.addPage([600, 800]); // Initial Page
  //     const { width, height } = page.getSize();
  //     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  //     const titleFontSize = 24;
  //     const bodyFontSize = 12;
  //     const textColor = rgb(0, 0, 0); // Black text

  //     let y = height - 50; // Track Y Position

  //     // Helper function to add a new page
  //     const addNewPage = () => {
  //       page = pdfDoc.addPage([600, 800]);
  //       y = height - 50;
  //     };

  //     // Helper function to draw text with pagination
  //     const drawTextWithPagination = (
  //       text: string,
  //       x: number,
  //       lineHeight = 18,
  //     ) => {
  //       const lines = text.split("\n");
  //       lines.forEach((line) => {
  //         if (y < 50) addNewPage(); // Add new page if text exceeds space
  //         page.drawText(line, {
  //           x,
  //           y,
  //           size: bodyFontSize,
  //           font,
  //           maxWidth: 500,
  //         });
  //         y -= lineHeight;
  //       });
  //     };

  //     // Title Section
  //     page.drawText("Contract", {
  //       x: width / 2 - 50,
  //       y,
  //       size: titleFontSize,
  //       font,
  //       color: textColor,
  //     });
  //     y -= 50;

  //     page.drawText(`Manville Manor Event Space Rental Agreement`, {
  //       x: 50,
  //       y,
  //       size: 16,
  //       font,
  //       color: textColor,
  //     });
  //     y -= 40;

  //     const contractDetails = `
  //       This Event Space Rental Agreement is entered into on [Date] by and between Manville Manor,
  //       located at 39 South St, Manville, NJ and ${bookingData?.fullName}.
  //     `;
  //     drawTextWithPagination(contractDetails, 50);

  //     // Event Details Section
  //     const eventDetails = [
  //       `• Event Date: ${moment(bookingData?.date).format("DD-MMMM-YYYY")}`,
  //       `• Event Time: ${moment(bookingData?.date).format("h:mma")}`,
  //       `• Number of Guests: ${bookingData?.adultsCount + bookingData?.childsCount}`,
  //     ];

  //     page.drawText("1. Event Details", { x: 50, y, size: 14 });
  //     y -= 30;
  //     eventDetails.forEach((line) => {
  //       // page.drawText(line, { x: 60, y, size: bodyFontSize });
  //       // y -= 18;
  //       drawTextWithPagination(line, 60);
  //     });

  //     // Rental Fee Section

  //     const rentalDetails = [
  //       `• Rental Fee: The total rental fee for the event space is $${bookingData?.invoice?.totalPrice}`,
  //       `• Deposit: A non-refundable deposit of $250 is due upon signing this Agreement. This amount
  //       will be applied to the total rental fee.`,
  //       `• Final Payment: The remaining balance of $[Remaining Amount] is due no later than
  //        [Number of Days] days before the event date.`,
  //       `• Late Payments: Late payments will incur a fee of $[Late Fee] per day.`,
  //     ];

  //     y -= 15;
  //     page.drawText("2. Rental Fee and Payment Terms", { x: 50, y, size: 14 });
  //     y -= 30;
  //     rentalDetails.forEach((line) => {
  //       drawTextWithPagination(line, 60);
  //     });

  //     // Cancellation Policy
  //     y -= 15;
  //     page.drawText("3. Cancellation Policy", { x: 50, y, size: 14 });
  //     y -= 30;
  //     drawTextWithPagination(
  //       `• Client Cancellation: If the Client cancels the event:
  //       • More than [Number of Days] days before the event: [Percentage]% of the rental fee will
  //        be refunded, minus the deposit.
  //       • Less than [Number of Days] days before the event: No refund will be given.`,
  //       60,
  //     );

  //     y -= 0;
  //     drawTextWithPagination(
  //       `• Owner Cancellation: The Owner reserves the right to cancel the event for reasons
  //    beyond its control (e.g., natural disasters, venue damage). In such cases, a full refund,
  //    including the deposit, will be issued to the Client.`,
  //       60,
  //     );

  //     // Damage and Liability
  //     y -= 15;
  //     page.drawText("4. Damage and Liability", { x: 50, y, size: 14 });
  //     y -= 30;
  //     drawTextWithPagination(
  //       `• Client Responsibility: The Client is responsible for any damage to the property, facilities,
  //       or equipment caused by the Client or their guests during the event.`,
  //       60,
  //     );
  //     y -= 2;
  //     drawTextWithPagination(
  //       `• Damage Deposit: A refundable damage deposit of $[Amount] is required. The deposit will be
  //       refunded within [Number of Days] days after the event, provided no damage has occurred.`,
  //       60,
  //     );

  //     y -= 2;
  //     drawTextWithPagination(
  //       `• Liability for Damage: If damages exceed the damage deposit, the Client agrees to pay the
  //       additional costs within [Number of Days] days of receiving an invoice from the Owner.`,
  //       60,
  //     );

  //     // y -= 0;
  //     // drawTextWithPagination(
  //     //   `• Damage Deposit: A refundable damage deposit of $[Amount] is required. The deposit will
  //     // be refunded within [Number of Days] days after the event, provided no damage has occurred.`,
  //     //   60,
  //     // );

  //     y -= 15;
  //     page.drawText("5. Indemnification", { x: 50, y, size: 14 });
  //     y -= 30;
  //     // drawTextWithPagination(
  //     //   `• The Client agrees to indemnify, defend, and hold harmless Manville Manor, its owners,
  //     //   employees, and agents from and against any and all claims, damages, losses, liabilities, and
  //     //   expenses (including reasonable attorney's fees) arising from the Client's use of the event
  //     //   space, including but not limited to damages caused by guests or third parties.`,
  //     //   60,
  //     // );

  //     drawTextWithPagination(
  //       `• The Client agrees to indemnify, defend, and hold harmless Manville Manor, its owners, employees, and agents from and against any and all claims, damages, losses, liabilities, and expenses (including reasonable attorney's fees) arising from the Client's use of the event space, including but not limited to damages caused by guests or third parties.`,

  //       60,
  //     );

  //     //  • Personal injury or property damage occurring on the premises during the event.
  //     //   • Any claims made by third parties or guests in attendance at the event.`,
  //     // Signature Section
  //     if (y < 100) addNewPage();
  //     page.drawText("Client Signature:", { x: 50, y, size: 14 });
  //     y -= 30;
  //     page.drawText(`Date: ${values.dateClient}`, {
  //       x: 50,
  //       y,
  //       size: bodyFontSize,
  //     });

  //     // Embed Client Signature (if available)
  //     // if (values.clientSignature) {
  //     //   const base64String = await convertFileToBase64(values.clientSignature);
  //     //   const signatureImage = await pdfDoc.embedPng(base64String);
  //     //   const scaledSignature = signatureImage.scale(0.3);

  //     //   if (y < 100) addNewPage();
  //     //   page.drawImage(signatureImage, {
  //     //     x: 180,
  //     //     y: y - 40,
  //     //     width: scaledSignature.width,
  //     //     height: scaledSignature.height,
  //     //   });
  //     // }

  //     // Save PDF to Blob and Open in New Tab
  //     const pdfBytes = await pdfDoc.save();
  //     const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  //     const pdfUrl = URL.createObjectURL(pdfBlob);
  //     window.open(pdfUrl, "_blank");
  //   } catch (error) {
  //     console.error("Error generating or sending contract", error);
  //   } finally {
  //     setisPostingContract(false);
  //   }
  // };

  console.log("bookingData", bookingData);

  const submitContract = async (values: any) => {
    console.log("Generating Contract...");

    try {
      setisPostingContract(true);

      const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };

      // Generate PDF using pdf-lib
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([600, 800]); // Initial Page
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const titleFontSize = 24;
      const bodyFontSize = 12;
      const textColor = rgb(0, 0, 0); // Black text

      let y = height - 50; // Track Y Position

      // Helper function to add a new page
      const addNewPage = () => {
        page = pdfDoc.addPage([600, 800]);
        y = height - 50;
      };

      // Helper function to draw text with pagination
      const drawTextWithPagination = (
        text: string,
        x: number,
        lineHeight = 18,
      ) => {
        const lines = text.split("\n");
        lines.forEach((line) => {
          if (y < 50) addNewPage(); // Add new page if text exceeds space
          page.drawText(line, {
            x,
            y,
            size: bodyFontSize,
            font,
            maxWidth: 500,
            lineHeight: 18,
          });
          y -= lineHeight;
        });
      };

      const drawOrderSummary = () => {
        const boxPadding = 10;
        const rowHeight = 25;
        const tableWidth = width - 100;
        const startX = 50;
        let startY = y;

        const drawRow = (
          text: string[],
          boldIndexes: number[] = [],
          isHeader = false,
        ) => {
          const rowY = startY;
          page.drawRectangle({
            x: startX,
            y: rowY,
            width: tableWidth,
            height: rowHeight,
            color: isHeader ? rgb(0.9, 0.8, 0.7) : rgb(1, 1, 1),
            borderColor: rgb(0, 0, 0),
            borderWidth: 0.5,
          });

          const colWidths = [400, 100];
          let currentX = startX + boxPadding;

          text.forEach((cell, index) => {
            const cellFont = boldIndexes.includes(index) ? boldFont : font;
            const isPriceColumn = index === 1;

            page.drawText(cell, {
              x: isPriceColumn
                ? startX + tableWidth - colWidths[1] + boxPadding
                : currentX,
              y: rowY + boxPadding,
              size: bodyFontSize,
              font: cellFont,
              maxWidth: colWidths[index] - boxPadding * 2,
            });

            currentX += colWidths[index];
          });

          startY -= rowHeight;
        };

        page.drawText("Order Summary", {
          x: startX,
          y: startY,
          size: 18,
          font: boldFont,
          color: textColor,
        });
        startY -= 30;

        // Header Row (Description and Price)
        drawRow(["Description", "Price"], [0, 1], true);

        // Data Rows (Dynamic Data)
        drawRow(
          ["Package Price", `$${bookingData?.invoice?.items?.packagePrice}`],
          [0, 1],
        );
        drawRow(
          ["Catering", `$${bookingData?.invoice?.items?.cateringTotal}`],
          [],
        );
        drawRow(
          [
            "Additional Services",
            `$${bookingData?.invoice?.items?.additionalServices}`,
          ],
          [],
        );
        drawRow(
          [
            "Incidental Deposit (Refundable)",
            `$${bookingData?.invoice?.items?.incidentalDeposit}`,
          ],
          [],
        );

        // Draw Total Row
        startY -= 10;
        drawRow(["Order Total:", `$${bookingData?.invoice?.totalPrice}`], [1]);

        startY -= 20;
        y = startY;
      };

      // === Call Order Summary Here ===
      drawOrderSummary();

      // Title Section
      page.drawText("Contract", {
        x: width / 2 - 50,
        y,
        size: titleFontSize,
        font,
        color: textColor,
      });
      y -= 30;

      page.drawText(`Manville Manor Event Space Rental Agreement`, {
        x: 50,
        y,
        size: 16,
        font,
        color: textColor,
      });
      y -= 10;

      const contractDetails = `
        This Event Space Rental Agreement is entered into on [Date] by and between Manville Manor, located at 39 South St, Manville, NJ and ${bookingData?.fullName}.
      `;

      y -= 0;
      drawTextWithPagination(contractDetails, 50);

      // Event Details Section
      const eventDetails = [
        `• Event Date: ${moment(bookingData?.date).format("DD-MMMM-YYYY")}`,
        `• Event Time: ${moment(bookingData?.date).format("h:mma")}`,
        `• Number of Guests: ${bookingData?.adultsCount + bookingData?.childsCount}`,
      ];

      y -= 30;
      page.drawText("1. Event Details", { x: 50, y, size: 14 });
      y -= 25;
      eventDetails.forEach((line) => {
        drawTextWithPagination(line, 60);
      });

      // Rental
      y -= 20;
      page.drawText("2. Rental Fee and Payment Terms", { x: 50, y, size: 14 });

      y -= 25;
      drawTextWithPagination(
        `• Rental Fee: The total rental fee for the event space is $${bookingData?.invoice?.totalPrice}`,
        60,
      );
      y -= 5;
      drawTextWithPagination(
        `• Deposit: A non-refundable deposit of $250 is due upon signing this Agreement. This amount will be applied to the total rental fee.`,
        60,
      );

      y -= 25;
      drawTextWithPagination(
        `• Final Payment: The remaining balance of $[Remaining Amount] is due no later than [Number of Days] days before the event date.`,
        60,
      );
      y -= 25;
      drawTextWithPagination(
        `• Late Payments: Late payments will incur a fee of $[Late Fee] per day.`,
        60,
      );

      // Cancellation Policy
      y -= 25;
      page.drawText("3. Cancellation Policy", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• Client Cancellation: If the Client cancels the event:`,
        60,
      );

      y -= 5;
      drawTextWithPagination(
        `• More than [Number of Days] days before the event: [Percentage]% of the rental fee will be refunded, minus the deposit.`,
        80,
      );

      y -= 20;
      drawTextWithPagination(
        `• Less than [Number of Days] days before the event: No refund will be given.`,
        80,
      );

      y -= 5;
      drawTextWithPagination(
        `• Owner Cancellation: The Owner reserves the right to cancel the event for reasons beyond its control (e.g., natural disasters, venue damage). In such cases, a full refund, including the deposit, will be issued to the Client.`,
        60,
      );

      // Damage and Liability
      y -= 55;
      page.drawText("4. Damage and Liability", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• Client Responsibility: The Client is responsible for any damage to the property, facilities, or equipment caused by the Client or their guests during the event.`,
        60,
      );
      y -= 25;
      drawTextWithPagination(
        `• Damage Deposit: A refundable damage deposit of $[Amount] is required. The deposit will be refunded within [Number of Days] days after the event, provided no damage has occurred.`,
        60,
      );

      y -= 25;
      drawTextWithPagination(
        `• Liability for Damage: If damages exceed the damage deposit, the Client agrees to pay the additional costs within [Number of Days] days of receiving an invoice from the Owner.`,
        60,
      );

      //  Indemnification
      y -= 45;
      page.drawText("5. Indemnification", { x: 50, y, size: 14 });
      y -= 25;

      drawTextWithPagination(
        `• The Client agrees to indemnify, defend, and hold harmless Manville Manor, its owners, employees, and agents from and against any and all claims, damages, losses, liabilities, and expenses (including reasonable attorney's fees) arising from the Client's use of the event space, including but not limited to damages caused by guests or third parties.`,
        60,
      );

      y -= 60;
      drawTextWithPagination(
        `• Personal injury or property damage occurring on the premises during the event.`,
        80,
      );
      y -= 0;
      drawTextWithPagination(
        `• Any claims made by third parties or guests in attendance at the event`,
        80,
      );

      y -= 5;
      drawTextWithPagination(
        `• The Owner shall not be held responsible for any loss, theft, or damage to personal property or equipment brought onto the premises by the Client or their guests.`,
        60,
      );

      // Event Conduct
      y -= 45;
      page.drawText("6. Event Conduct", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• Compliance with Laws: The Client agrees to comply with all local, state, and federal laws, including but not limited to alcohol consumption laws, noise ordinances, and occupancy limits.`,
        60,
      );

      y -= 25;
      drawTextWithPagination(
        `• Guest Behavior: The Client is responsible for the behavior of all guests. The Owner reserves the right to terminate the event if guests engage in illegal activities or disruptive behavior, without a refund.`,
        60,
      );

      // Force Majeure
      y -= 45;
      page.drawText("7. Force Majeure", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• The Owner shall not be liable for any failure or delay in performing its obligations under this Agreement if such failure or delay is due to circumstances beyond its reasonable control, including but not limited to acts of God, war, terrorism, or government restrictions.`,
        60,
      );

      // Termination of Agreement
      y -= 45;
      page.drawText("8. Termination of Agreement", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• Breach by Client: The Owner reserves the right to terminate this Agreement without notice if the Client breaches any terms of this Agreement.`,
        60,
      );

      y -= 25;
      drawTextWithPagination(
        `• Refunds upon Termination: In the event of termination due to breach by the Client, no refunds will be issued.`,
        60,
      );

      // Miscellaneous
      y -= 45;
      page.drawText("9. Miscellaneous", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• Amendments: Any amendments to this Agreement must be made in writing and signed by both parties.`,
        60,
      );

      y -= 25;
      drawTextWithPagination(
        `• Entire Agreement: This Agreement constitutes the entire agreement between the parties and supersedes any prior agreements, understandings, or representations`,
        60,
      );

      y -= 25;
      drawTextWithPagination(
        `• Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the State of New Jersey.`,
        60,
      );

      // Acceptance of Terms
      y -= 45;
      page.drawText("10. Acceptance of Terms", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• By signing below, the Client acknowledges that they have read, understood, and agree to the terms and conditions outlined in this Agreement.`,
        60,
      );

      // Signature Section
      if (y < 100) addNewPage();
      y -= 130;

      page.drawText("Client Signature:", { x: 50, y, size: 14 });
      y -= 30;
      page.drawText(`Date: ${values.dateClient}`, {
        x: 50,
        y,
        size: bodyFontSize,
      });

      if (values.clientSignature) {
        const base64String = await convertFileToBase64(values.clientSignature);
        const signatureImage = await pdfDoc.embedPng(base64String);

        // Max dimensions for the signature
        const maxWidth = 150; // Reduce width to 150px
        const maxHeight = 60; // Reduce height to 60px
        let scaledWidth = signatureImage.width;
        let scaledHeight = signatureImage.height;

        // Maintain aspect ratio
        if (
          signatureImage.width > maxWidth ||
          signatureImage.height > maxHeight
        ) {
          const scaleFactor = Math.min(
            maxWidth / signatureImage.width,
            maxHeight / signatureImage.height,
          );
          scaledWidth = signatureImage.width * scaleFactor;
          scaledHeight = signatureImage.height * scaleFactor;
        }
        // Draw Signature Image
        page.drawImage(signatureImage, {
          x: 180,
          y: height - 450,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

      // Save PDF to Blob and Open in New Tab
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error generating or sending contract", error);
    } finally {
      setisPostingContract(false);
    }
  };

  // Helper to Convert Blob to Base64
  const blobToBase64 = (blob: Blob) =>
    new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        resolve(reader.result?.toString().split(",")[1] || "");
      reader.readAsDataURL(blob);
    });

  return (
    <>
      {isLoading ? (
        <div className="h-[50vh]">
          <Spinner />
        </div>
      ) : bookingData ? (
        <div className="pdf-container container bg-primary pb-11 pt-24 md:py-[6.6875rem]">
          <table
            ref={targetRef}
            className="border-b-8 border-transparent text-white "
          >
            <thead className="border-b-[10px] border-transparent ">
              <InvoiceCard invoiceData={bookingData?.invoice} />
              <div className="">
                <h1 className="mt-2 text-center font-cormorant text-[4rem]">
                  Contract
                </h1>
                <div>
                  <h2 className="my-6 text-[2.25rem] font-semibold md:text-[3rem]">
                    Manville Manor Event Space Rental Agreement
                  </h2>
                  <p className="text-[1.375rem] md:text-[2.25rem]">
                    {`This Event Space Rental Agreement is
                entered into on [Date] by and between Manville Manor, located at
                39 South St, Manville, NJ and ${bookingData?.fullName}.`}
                  </p>

                  <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                    1. Event Details
                  </h2>
                  <ul className="ml-12  list-disc text-[1.375rem] md:text-[2.25rem]">
                    <li>{`Event Date: ${moment(bookingData?.date).format("DD-MMMM-YYYY")}`}</li>
                    <li>{`Event Time: ${moment(bookingData?.date).format("h:mma")}`}</li>
                    <li>
                      {`Number of Guests: ${bookingData?.adultsCount + bookingData?.childsCount}`}
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
                      Deposit: A non-refundable deposit of $250 is due upon
                      signing this Agreement. This amount will be applied to the
                      total rental fee.
                    </li>
                    <li>
                      Final Payment: The remaining balance of $[Remaining
                      Amount] is due no later than [Number of Days] days before
                      the event date.
                    </li>
                    <li>
                      Late Payments: Late payments will incur a fee of $[Late
                      Fee] per day.
                    </li>
                  </ul>

                  <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                    3. Cancellation Policy
                  </h2>
                  <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                    <li>
                      Client Cancellation: If the Client cancels the event:
                    </li>
                    <li className="ml-10">
                      More than [Number of Days] days before the event:
                      [Percentage]% of the rental fee will be refunded, minus
                      the deposit.
                    </li>
                    <li className="ml-10">
                      Less than [Number of Days] days before the event: No
                      refund will be given.
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
                      Damage Deposit: A refundable damage deposit of $[Amount]
                      is required. The deposit will be refunded within [Number
                      of Days] days after the event, provided no damage has
                      occurred.
                    </li>
                    <li>
                      Liability for Damage: If damages exceed the damage
                      deposit, the Client agrees to pay the additional costs
                      within [Number of Days] days of receiving an invoice from
                      the Owner.
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
                      Personal injury or property damage occurring on the
                      premises during the event.
                    </li>
                    <li className="ml-10">
                      Any claims made by third parties or guests in attendance
                      at the event.
                    </li>
                    <li>
                      The Owner shall not be held responsible for any loss,
                      theft, or damage to personal property or equipment brought
                      onto the premises by the Client or their guests.
                    </li>
                  </ul>

                  <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                    6. Event Conduct
                  </h2>

                  <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                    <li>
                      Compliance with Laws: The Client agrees to comply with all
                      local, state, and federal laws, including but not limited
                      to alcohol consumption laws, noise ordinances, and
                      occupancy limits.
                    </li>
                    <li>
                      Guest Behavior: The Client is responsible for the behavior
                      of all guests. The Owner reserves the right to terminate
                      the event if guests engage in illegal activities or
                      disruptive behavior, without a refund.
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
                      Breach by Client: The Owner reserves the right to
                      terminate this Agreement without notice if the Client
                      breaches any terms of this Agreement.
                    </li>
                    <li>
                      Refunds upon Termination: In the event of termination due
                      to breach by the Client, no refunds will be issued.
                    </li>
                  </ul>

                  <h2 className="mt-10 text-[1.375rem] font-semibold md:text-[2.25rem]">
                    9. Miscellaneous
                  </h2>
                  <ul className="ml-12 list-disc text-[1.375rem] md:text-[2.25rem]">
                    <li>
                      Amendments: Any amendments to this Agreement must be made
                      in writing and signed by both parties.
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

              <div className="mt-32 text-[1.375rem] text-black md:text-[2.25rem]">
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

                          <div className="w-[22rem] border-b border-dashed border-white text-base text-black"></div>
                        </div>

                        <div className="flex items-end gap-2 leading-none ">
                          <span>Date: </span>
                          <div className="w-[22rem] border-b border-dashed border-white text-base text-black" />
                        </div>

                        <div className="mx-auto mt-4 w-fit">
                          <Button
                            size={"md"}
                            loading={isPostingContract}
                            disabled={isPostingContract}
                            className=""
                            // onClick={submitContract}
                          >
                            Submit Contract
                          </Button>
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
              </div>
            </thead>
          </table>

          {/* <div className="mx-auto mt-4 w-fit">
            <Button
              size={"md"}
              loading={isPostingContract}
              disabled={isPostingContract}
              className=""
              onClick={submitContract}
            >
              Submit Contract
            </Button>
          </div> */}
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

// "use client";
// import InvoiceCard from "@/components/shared/invoice-card";
// import moment, { Moment } from "moment";
// import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";

// import "react-datetime/css/react-datetime.css";
// // import ContractAgreement from "@/components/contract-agreement";
// import { Button } from "@/components/button";
// import Datetime from "react-datetime";
// import Dropzone from "react-dropzone";
// import { Field, Form, Formik, useFormikContext } from "formik";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { getInvoice, postContract } from "@/utils/api-calls";
// import { toast } from "react-toastify";
// import generatePDF, { Margin } from "react-to-pdf";
// import ContractTable from "./contract-table";

// interface SignatureDropzoneProps {
//   name: string;
//   hasError?: boolean;
//   isTouched?: boolean;
//   errorMessage?: string;
//   onSignatureChange?: (signature: File | null) => void; // Update signature type
// }

// const SignatureDropzone: FC<SignatureDropzoneProps> = ({
//   name,
//   isTouched,
//   hasError,
//   errorMessage,
//   onSignatureChange,
// }) => {
//   const { setFieldValue, setFieldTouched } = useFormikContext();
//   const [preview, setPreview] = useState<string>("");

//   const allowedTypes = [
//     "image/svg+xml",
//     "image/png",
//     "image/jpeg",
//     "image/jpg",
//   ];

//   const processFile = (file: File | undefined) => {
//     if (file && allowedTypes.includes(file.type)) {
//       setFieldValue(name, file);
//       setFieldTouched(name, true, false);
//       setPreview(URL.createObjectURL(file));

//       // Call onSignatureChange with the File object
//       if (onSignatureChange) {
//         onSignatureChange(file);
//       }
//     }
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event?.currentTarget?.files?.[0];
//     processFile(file);
//   };

//   return (
//     <div className="relative w-[22rem] border-b border-dashed border-white">
//       <Dropzone
//         onDrop={(files) => {
//           if (files && files[0]) {
//             const file = files[0];
//             processFile(file);
//           }
//         }}
//       >
//         {({ getRootProps }) => (
//           <div {...getRootProps()} className="w-full">
//             <div>
//               <label htmlFor={name} className="cursor-pointer">
//                 {preview ? (
//                   <Image
//                     src={preview}
//                     alt="client-signature"
//                     width={200}
//                     height={200}
//                     className="mx-auto max-h-32 max-w-52 object-contain"
//                   />
//                 ) : (
//                   <span className="block cursor-pointer bg-white py-2 text-center text-4xl uppercase text-black">
//                     DROP SIGNATURE
//                   </span>
//                 )}
//               </label>

//               <Field
//                 name={name}
//                 id={name}
//                 value={undefined}
//                 type="file"
//                 accept=".svg, .png, .jpeg, .jpg"
//                 className="hidden"
//                 onChange={(event: ChangeEvent<HTMLInputElement>) =>
//                   handleImageChange(event)
//                 }
//               />
//             </div>
//           </div>
//         )}
//       </Dropzone>

//       {isTouched && hasError && (
//         <p className="absolute mt-1 text-xs italic text-red-600">
//           {errorMessage}
//         </p>
//       )}
//     </div>
//   );
// };

// const InvoicePage = () => {
//   const [bookingData, setBookingData] = useState<any>(null);
//   const targetRef = useRef<any | null>(null);

//   const searchParams = useSearchParams();
//   const [isLoading, setisLoading] = useState(true);
//   const bookingId = searchParams.get("bookingId");
//   const [isPostingContract, setisPostingContract] = useState<boolean>(false);
//   const router = useRouter();
//   const [clientSignature, setClientSignature] = useState<string>(""); // Use File type

//   const yesterday = moment().subtract(1, "day");
//   const disablePastDt = (current: Moment) => {
//     return current.isAfter(yesterday);
//   };

//   const inputProps = {
//     id: "dateClient",
//     className: `w-full appearance-none bg-transparent text-2xl capitalize text-white outline-none cursor-pointer`,
//     readOnly: true,
//   };

//   // Fetch the invoice data from session storage when the component mounts

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       if (bookingId) {
//         try {
//           const resp = await getInvoice(Number(bookingId));
//           if (resp) {
//             setBookingData(resp);
//           }
//         } catch (error) {
//           console.error("error", error);
//         } finally {
//           setisLoading(false);
//         }
//       }
//     };

//     fetchInvoice();
//   }, [bookingId]);

//   const submitContract = async () => {
//     console.log("inside");

//     try {
//       setisPostingContract(true);

//       console.log("argetRef?.current", targetRef?.current);

//       if (targetRef?.current) {
//         const createPdf = await generatePDF(targetRef, {
//           filename: "contract.pdf",
//           method: "open",
//           page: {
//             margin: Margin.SMALL,
//           },
//         });

//         const pp = createPdf.setDisplayMode("fullheight", "continuous");
//         const pdfBlob = pp.output("blob");

//         const formData = new FormData();
//         formData.append("files", pdfBlob);

//         console.log("inside", createPdf);

//         // const resp = await postContract(bookingData?.id, formData);
//         // if (resp) {
//         //   toast.success("Booking Updated Contract", {
//         //     position: "bottom-right",
//         //     autoClose: 2000,
//         //     hideProgressBar: true,
//         //   });

//         //   // router.replace("/payment");
//         // }
//       }
//     } catch (error) {
//       console.error("Error generating or uploading contract", error);
//     } finally {
//       setisPostingContract(false);
//     }
//   };

//   console.log("clientSignato", clientSignature);

//   return (
//     <>
//       <div className="pdf-container container bg-primary pb-11 pt-24 md:py-[6.6875rem]">
//         <ContractTable
//           bookingData={bookingData}
//           forDisplay
//           // submitContract={submitContract}
//           onSignatureChange={setClientSignature}
//         />

//         <ContractTable
//           bookingData={bookingData}
//           targetRef={targetRef}
//           submitContract={submitContract}
//           // Pass the clientSignature state to the second component
//           clientSignature={clientSignature}
//         ></ContractTable>

//         <div className="mx-auto mt-4 w-fit">
//           <Button
//             size={"md"}
//             loading={isPostingContract}
//             disabled={isPostingContract}
//             className=""
//             onClick={submitContract}
//           >
//             Submit Contract
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InvoicePage;
