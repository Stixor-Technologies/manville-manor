import React, { FC, useState } from "react";
import { ContractFormSchema } from "@/utils/formik-schema";
import { Form, Formik } from "formik";
import { Button } from "@/components/button";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment, { Moment } from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

interface ContractAgreementProps {
  bookingId: number;
  bookingData: any;
}

// NOTE: Commenting this for now

// interface SignatureDropzoneProps {
//   name: string;
//   hasError?: boolean;
//   isTouched?: boolean;
//   errorMessage?: string;
// }

// const SignatureDropzone: FC<SignatureDropzoneProps> = ({
//   name,
//   isTouched,
//   hasError,
//   errorMessage,
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

const ContractAgreement: FC<ContractAgreementProps> = ({
  bookingId,
  bookingData,
}) => {
  const [isPostingContract, setisPostingContract] = useState<boolean>(false);
  const router = useRouter();
  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current: Moment) => {
    return current.isAfter(yesterday);
  };

  const inputProps = {
    id: "dateClient",
    className: `w-full appearance-none bg-transparent text-2xl capitalize text-white outline-none cursor-pointer`,
  };

  const submitContract = async (values: any) => {
    try {
      setisPostingContract(true);

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

      const embedLogo = async () => {
        const logoUrl = "/logo.png"; // Update with actual logo path or use a File Upload
        const response = await fetch(logoUrl);
        const logoBytes = await response.arrayBuffer();
        return pdfDoc.embedPng(logoBytes);
      };

      // Inside your submitContract function before drawing text
      const logoImage = await embedLogo();

      // Define logo position and size
      const logoWidth = 100; // Adjust size as needed
      const logoHeight = 50; // Adjust size as needed
      const logoX = 50; // Position from left
      const logoY = height - 50;

      // Draw logo on the page
      page.drawImage(logoImage, {
        x: logoX,
        y: logoY,
        width: logoWidth,
        height: logoHeight,
      });

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
          y: startY - 30,
          size: 18,
          font: boldFont,
          color: textColor,
        });
        startY -= 60;

        // Header Row (Description and Price)
        drawRow(["Description", "Price"], [0, 1], true);

        // Data Rows (Dynamic Data)
        drawRow(
          ["Package Price", `$${bookingData?.invoice?.items?.packagePrice}`],
          [],
        );
        // drawRow(
        //   ["Catering", `$${bookingData?.invoice?.items?.cateringTotal}`],
        //   [],
        // );
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

        drawRow(["NJ sales tax", `$${bookingData?.invoice?.salesTax}`], []);

        // drawRow(
        //   ["Order Total", `$${bookingData?.invoice?.totalPriceWithTax}`],
        //   [1],
        // );

        // Draw Total Row
        startY -= 10;
        drawRow(["Total:", `$${bookingData?.invoice?.totalPrice}`], [1]);

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
        This Event Space Rental Agreement is entered into on ${moment(bookingData?.date).format("DD-MMMM-YYYY")} by and between Manville Manor, located at 39 South St, Manville, NJ and ${bookingData?.fullName}.
      `;

      y -= 0;
      drawTextWithPagination(contractDetails, 50);

      // const getEventTime = () => {
      //   const startTime = moment(bookingData?.date).format("h:mma");
      //   const startHour = moment(bookingData?.date).hour();
      //   const endTime = startHour < 16 ? "3:00pm" : "10:30pm";
      //   return `${startTime} - ${endTime}`;
      // };

      // Event Details Section

      const getEventTime = () => {
        const startTime = moment.utc(bookingData?.date).format("h:mma");
        const startHour = moment.utc(bookingData?.date).hour();
        const endTime = startHour < 16 ? "3:00pm" : "10:30pm";
        return `${startTime} - ${endTime}`;
      };

      const eventDetails = [
        `• Event Date: ${moment(bookingData?.date).format("DD-MMMM-YYYY")}`,
        `• Event Time: ${getEventTime()}`,
        `• Number of Guests: ${bookingData?.adultsCount + bookingData?.childsCount}`,
      ];

      y -= 30;
      page.drawText("1. Event Details", { x: 50, y, size: 14 });
      y -= 25;
      eventDetails.forEach((line) => {
        drawTextWithPagination(line, 60);
      });

      // Cancellation Policy
      y -= 25;
      page.drawText("2. Cancellation Policy", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• 100% payment due time of booking and fully refundable with in 90 days`,
        60,
      );

      y -= 5;
      drawTextWithPagination(
        `• Cancellations 45-89 days before: 75% of deposit refunded,`,
        60,
      );

      y -= 5;
      drawTextWithPagination(
        `• Cancellations less than 45 days before: No refund`,
        80,
      );

      y -= 5;
      drawTextWithPagination(
        `• For rescheduling, please inform us before the 6-week mark. And will credit towards your new date within one year from the original booking, with applicable rescheduling fees.`,
        60,
      );

      y -= 20;
      drawTextWithPagination(
        `• Credit Card payments are Final and cannot be disputed.`,
        60,
      );

      y -= 5;
      drawTextWithPagination(
        `• Owner Cancellation: The Owner reserves the right to cancel the event for reasons beyond its control (e.g., natural disasters, venue damage). In such cases, a full refund, including the deposit, will be issued to the Client.`,
        60,
      );

      // RULES AND REGULATIONS
      y -= 55;
      page.drawText("3. Rules and Regulations", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• Capacity: Maximum capacity is [81] persons`,
        60,
      );
      y -= 5;
      drawTextWithPagination(
        `• Setup/Cleanup: - Setup may begin 2 hours before event start time - Cleanup must be completed within 1 hour after event end time`,
        60,
      );

      y -= 25;
      drawTextWithPagination(
        `• Decorations: - No nails, screws, staples, or penetrating items on walls or floors - No glitter or confetti - No open flames (except catering equipment and birthday candles)`,
        60,
      );
      y -= 25;
      drawTextWithPagination(
        `• Noise levels must comply with local ordinances`,
        60,
      );
      y -= 5;
      drawTextWithPagination(
        `• Smoking & vaping is prohibited inside the building`,
        60,
      );
      y -= 5;
      drawTextWithPagination(
        `• Alcohol service must comply with state and local laws`,
        60,
      );

      //  Indemnification
      y -= 35;
      page.drawText("4. Categring and Vendores", { x: 50, y, size: 14 });
      y -= 25;

      drawTextWithPagination(
        `• All vendors must be licensed and insured - Vendor list must be submitted 14 days prior to event - Certificate of Insurance required from all vendors Not allowed on our venue premises:`,
        60,
      );

      y -= 30;
      drawTextWithPagination(
        `• Smoking permitted only in designated outdoor areas`,
        80,
      );
      y -= 0;
      drawTextWithPagination(
        `• No glitter or confetti including balloons with confetti in them`,
        80,
      );

      y -= 0;
      drawTextWithPagination(`• No use of tape on venue walls.`, 80);
      y -= 0;
      drawTextWithPagination(
        `• No real flames except for warming food and candles for the event cake. Floating candles allowed as long as they are not exposed flames and in a container. And No Sparklers`,
        80,
      );

      y -= 35;
      page.drawText("Capacity & Safety", { x: 70, y, size: 14 });

      y -= 25;
      drawTextWithPagination(
        `• Maximum capacity: 81 guests, 2 Kitchen, Fire exits must remain unobstructed, Emergency procedures must be followed, Right to refuse entry for safety concerns, Compliance with all local fire, noise and safety codes required`,
        70,
      );

      y -= 55;
      page.drawText("Alcohol", { x: 70, y, size: 14 });

      y -= 25;
      drawTextWithPagination(
        `• A licensed and insured bartender is required and service must end 30 minutes before event conclusion`,
        70,
      );
      y -= 25;
      drawTextWithPagination(
        `• Professional bartenders required for all alcohol service and cannot be resold onsite to guests.`,
        70,
      );
      y -= 25;
      drawTextWithPagination(
        `• Proof of liquor liability insurance required , We may add security as needed, based on the event's nature and timing.`,
        70,
      );

      // Event Conduct
      y -= 45;
      page.drawText("Property & Liability", { x: 70, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• Client responsible for guest conduct and subject to event termination if guests engage in illegal activities or disruptive behavior, without a refund.`,
        70,
      );

      y -= 25;
      drawTextWithPagination(
        `• Damage in excess of damage deposit to venue or equipment will be billed separately with in 3 days of invoice.`,
        70,
      );

      y -= 25;
      drawTextWithPagination(
        `• Venue not responsible for lost/stolen items or damage to personal property or equipment brought onto the premises by the Client or their guests. Sound Regulations`,
        70,
      );

      y -= 25;
      drawTextWithPagination(
        `• Music must comply with local noise ordinances & Volume control at management discretion`,
        70,
      );

      y -= 5;
      drawTextWithPagination(
        `• Live music/DJ must provide own equipment & All entertainment must end by 10:30 PM`,
        70,
      );

      y -= 35;
      page.drawText("Unforeseen Circumstances", { x: 70, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• Venue not liable for circumstances beyond its control`,
        70,
      );
      y -= 5;
      drawTextWithPagination(
        `• Including but not limited to: natural disasters, weather, pandemics, government restrictions`,
        70,
      );

      y -= 5;
      drawTextWithPagination(
        `• Alternative dates will be offered if possible`,
        70,
      );

      y -= 5;
      drawTextWithPagination(`• Changes to Agreement`, 70);

      y -= 5;
      drawTextWithPagination(
        `• Terms subject to change with written notice`,
        70,
      );

      y -= 5;
      drawTextWithPagination(`• Disputes resolved through arbitration`, 70);

      y -= 5;
      drawTextWithPagination(`• New Jersey law governs all agreements`, 70);

      // Indemnification
      y -= 45;
      page.drawText("5. Indemnification", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• The Client (Lessee )agrees to indemnify, defend, and hold harmless Manville Manor, its owners, employees, and agents from and against any and all claims, damages, losses, liabilities, and expenses (including reasonable attorney's fees) arising from the Client's use of the event space, including but not limited to: Personal injury or property damage occurring on the premises during the event. Any claims made by third parties or guests in attendance at the event.`,
        60,
      );

      // Force Majeure
      y -= 125;
      page.drawText("6. Force Majeure", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• Neither party shall be liable for failure to perform due to circumstances beyond reasonable control.`,
        60,
      );

      // Termination of Agreement
      y -= 45;
      page.drawText("7. Governing Law", { x: 50, y, size: 14 });
      y -= 25;
      drawTextWithPagination(
        `• This Agreement shall be governed by the laws of the State of [NJ]. Any amendments to this Agreement must be made in writing and signed by both parties. This Agreement constitutes the entire agreement between the parties and supersedes any prior agreements, understandings, or representations.`,
        60,
      );

      // Acceptance of Terms
      y -= 45;
      drawTextWithPagination(
        `By signing below, the Client acknowledges that they have read, understood, and agree to the terms and conditions outlined in this Agreement.`,
        40,
      );

      // Signature Section
      if (y < 100) addNewPage();
      y -= 80;

      page.drawText(`Client Signature: ${bookingData?.fullName}`, {
        x: 50,
        y,
        size: 14,
      });
      y -= 30;
      page.drawText(
        `Date: ${moment(values.dateClient).format("MMMM-DD-YYYY")}`,
        {
          x: 50,
          y,
          size: bodyFontSize,
        },
      );

      // Save PDF to Blob and Open in New Tab
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      reader.onloadend = async () => {
        const base64String = reader.result?.toString().split(",")[1];

        const emailTemplate = `<div>
        <p>This is the contract for Booking Id: ${bookingData?.id} </p>
        <p>Contact Information: ${bookingData?.fullName} - ${bookingData?.email} </p>
        </div>`;

        const res = await fetch("/api/contract-send", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            bookingId: bookingData?.id,
            fileName: `${bookingData?.fullName}-contract.pdf`,
            fileData: base64String,
            mimeType: "application/pdf",
            htmlContent: emailTemplate,
          }),
        });
        const data = await res.json();
        if (data === 202) {
          toast.success("Contract has been sent to owner", {
            position: "bottom-right",
          });
          saveAs(pdfBlob, `${bookingData?.fullName}-contract.pdf`);
          setisPostingContract(false);
          router.replace(`/payment?bookingId=${bookingId}`);
        } else {
          toast.error("Error sending Contract", {
            position: "bottom-right",
          });
          setisPostingContract(false);
        }
      };

      // const pdfUrl = URL.createObjectURL(pdfBlob);
      // window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error generating or sending contract", error);
    }
  };

  return (
    <div className="mt-8 text-[1.375rem] text-white md:text-[2.25rem]">
      <Formik
        initialValues={{
          // clientSignature: "",
          dateClient: moment(),
        }}
        onSubmit={submitContract}
        validationSchema={ContractFormSchema}
      >
        {({ errors, touched, setFieldValue }) => (
          <>
            <Form className="flex flex-col gap-10">
              <div className="flex items-end gap-2 leading-none ">
                <span>Client Signature:</span>

                {/* Note Commenting it for now */}
                {/* <SignatureDropzone
                  name="clientSignature"
                  hasError={!!errors.clientSignature}
                  isTouched={touched.clientSignature}
                  errorMessage={errors.clientSignature}
                /> */}

                <div className="w-[22rem] border-b border-dashed border-white">
                  <span>{bookingData?.fullName}</span>
                </div>
              </div>

              <div className="flex items-end gap-2 leading-none ">
                <span>Date: </span>

                <div className="w-[22rem] border-b border-dashed border-white text-base text-black">
                  <Datetime
                    className="text-auto"
                    closeOnSelect
                    value={moment()}
                    inputProps={inputProps}
                    isValidDate={disablePastDt}
                    timeFormat={false}
                    dateFormat="MMMM-DD-YYYY"
                    onClose={(dateValue) => {
                      if (
                        dateValue &&
                        (typeof dateValue === "string" ||
                          moment.isMoment(dateValue))
                      ) {
                        setFieldValue("dateClient", moment(dateValue).toDate());
                      }
                    }}
                  />

                  {!!errors?.dateClient && touched?.dateClient && (
                    <p className="absolute mt-1 text-xs italic text-red-600">
                      {typeof errors.dateClient === "string"
                        ? errors.dateClient
                        : ""}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-end gap-2 leading-none ">
                <span>Owner Signature:</span>

                <div className="w-[22rem] border-b border-dashed border-white text-base text-black">
                  {/* <span className="block bg-white py-2 text-center text-4xl uppercase text-black">
                    Drop Signature
                  </span> */}
                </div>
              </div>

              <div className="flex items-end gap-2 leading-none ">
                <span>Date: </span>
                <div className="w-[22rem] border-b border-dashed border-white text-base text-black" />
              </div>
              <Button
                size={"md"}
                loading={isPostingContract}
                disabled={isPostingContract}
                className="mx-auto mt-4"
              >
                Submit Contract
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ContractAgreement;
