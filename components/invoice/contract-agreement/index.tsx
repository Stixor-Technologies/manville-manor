import React, { ChangeEvent, FC, useState } from "react";
import { ContractFormSchema } from "@/utils/formik-schema";
import { Field, Form, Formik, useFormikContext } from "formik";
import { Button } from "@/components/button";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Dropzone from "react-dropzone";
import moment, { Moment } from "moment";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

interface ContractAgreementProps {
  bookingId: number;
  bookingData: any;
}

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

      const getEventTime = () => {
        const startTime = moment(bookingData?.date).format("h:mma");
        const startHour = moment(bookingData?.date).hour();
        const endTime = startHour < 16 ? "3:00pm" : "10:30pm";
        return `${startTime} - ${endTime}`;
      };

      // Event Details Section
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

      // Rental
      y -= 20;
      page.drawText("2. Rental Fee and Payment Terms", { x: 50, y, size: 14 });

      y -= 25;
      drawTextWithPagination(
        `• Rental Fee: The total rental fee for the event space is $${bookingData?.invoice?.totalPrice}.`,
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

      y -= 25;
      drawTextWithPagination(
        `• Terms Subject to change ith written notice`,
        60,
      );

      y -= 5;
      drawTextWithPagination(`• Disputes esolved through arbitration`, 60);

      y -= 5;
      drawTextWithPagination(`• New Jersey law governs all agreements`, 60);

      // Signature Section
      if (y < 100) addNewPage();
      y -= 130;

      page.drawText("Client Signature:", { x: 50, y, size: 14 });
      y -= 30;
      page.drawText(
        `Date: ${moment(values.dateClient).format("DD-MMMM-YYYY")}`,
        {
          x: 50,
          y,
          size: bodyFontSize,
        },
      );

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
          y: height - 580,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

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
    } finally {
      setisPostingContract(false);
    }
  };

  // new
  // const submitContract = async (values: any) => {
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
  //     const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

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
  //           lineHeight: 18,
  //         });
  //         y -= lineHeight;
  //       });
  //     };

  //     const drawOrderSummary = () => {
  //       const boxPadding = 10;
  //       const rowHeight = 25;
  //       const tableWidth = width - 100;
  //       const startX = 50;
  //       let startY = y;

  //       const drawRow = (
  //         text: string[],
  //         boldIndexes: number[] = [],
  //         isHeader = false,
  //       ) => {
  //         const rowY = startY;
  //         page.drawRectangle({
  //           x: startX,
  //           y: rowY,
  //           width: tableWidth,
  //           height: rowHeight,
  //           color: isHeader ? rgb(0.9, 0.8, 0.7) : rgb(1, 1, 1),
  //           borderColor: rgb(0, 0, 0),
  //           borderWidth: 0.5,
  //         });

  //         const colWidths = [400, 100];
  //         let currentX = startX + boxPadding;

  //         text.forEach((cell, index) => {
  //           const cellFont = boldIndexes.includes(index) ? boldFont : font;
  //           const isPriceColumn = index === 1;

  //           page.drawText(cell, {
  //             x: isPriceColumn
  //               ? startX + tableWidth - colWidths[1] + boxPadding
  //               : currentX,
  //             y: rowY + boxPadding,
  //             size: bodyFontSize,
  //             font: cellFont,
  //             maxWidth: colWidths[index] - boxPadding * 2,
  //           });

  //           currentX += colWidths[index];
  //         });

  //         startY -= rowHeight;
  //       };

  //       page.drawText("Order Summary", {
  //         x: startX,
  //         y: startY,
  //         size: 18,
  //         font: boldFont,
  //         color: textColor,
  //       });
  //       startY -= 30;

  //       // Header Row (Description and Price)
  //       drawRow(["Description", "Price"], [0, 1], true);

  //       // Data Rows (Dynamic Data)
  //       drawRow(
  //         ["Package Price", `$${bookingData?.invoice?.items?.packagePrice}`],
  //         [],
  //       );
  //       // drawRow(
  //       //   ["Catering", `$${bookingData?.invoice?.items?.cateringTotal}`],
  //       //   [],
  //       // );
  //       drawRow(
  //         [
  //           "Additional Services",
  //           `$${bookingData?.invoice?.items?.additionalServices}`,
  //         ],
  //         [],
  //       );
  //       drawRow(
  //         [
  //           "Incidental Deposit (Refundable)",
  //           `$${bookingData?.invoice?.items?.incidentalDeposit}`,
  //         ],
  //         [],
  //       );

  //       drawRow(["NJ sales tax", `$${bookingData?.invoice?.salesTax}`], []);

  //       // drawRow(
  //       //   ["Order Total", `$${bookingData?.invoice?.totalPriceWithTax}`],
  //       //   [1],
  //       // );

  //       // Draw Total Row
  //       startY -= 10;
  //       drawRow(["Total:", `$${bookingData?.invoice?.totalPrice}`], [1]);

  //       startY -= 20;
  //       y = startY;
  //     };

  //     // === Call Order Summary Here ===
  //     drawOrderSummary();

  //     // Title Section
  //     page.drawText("Contract", {
  //       x: width / 2 - 50,
  //       y,
  //       size: titleFontSize,
  //       font,
  //       color: textColor,
  //     });
  //     y -= 30;

  //     page.drawText(`Manville Manor Event Space Rental Agreement`, {
  //       x: 50,
  //       y,
  //       size: 16,
  //       font,
  //       color: textColor,
  //     });
  //     y -= 10;

  //     const contractDetails = `
  //       This Event Space Rental Agreement is entered into on ${moment(bookingData?.date).format("DD-MMMM-YYYY")} by and between Manville Manor, located at 39 South St, Manville, NJ and ${bookingData?.fullName}.
  //     `;

  //     y -= 0;
  //     drawTextWithPagination(contractDetails, 50);

  //     const getEventTime = () => {
  //       const startTime = moment(bookingData?.date).format("h:mma");
  //       const startHour = moment(bookingData?.date).hour();
  //       const endTime = startHour < 16 ? "3:00pm" : "10:30pm";
  //       return `${startTime} - ${endTime}`;
  //     };

  //     // Event Details Section
  //     const eventDetails = [
  //       `• Event Date: ${moment(bookingData?.date).format("DD-MMMM-YYYY")}`,
  //       `• Event Time: ${getEventTime()}`,
  //       `• Number of Guests: ${bookingData?.adultsCount + bookingData?.childsCount}`,
  //     ];

  //     y -= 30;
  //     page.drawText("Event Details", { x: 50, y, size: 14 });
  //     y -= 25;
  //     eventDetails.forEach((line) => {
  //       drawTextWithPagination(line, 60);
  //     });

  //     // Rental
  //     y -= 20;
  //     page.drawText("Booking & Reservation", { x: 50, y, size: 14 });

  //     y -= 25;
  //     drawTextWithPagination(
  //       `• A reserved venue requires both confirmed payment and the signing of a venue agreement. Book on website direct is fastest way to ensure your party is reserved as our Calendar is the up to date with availability for day time use and night time events.`,
  //       60,
  //     );
  //     y -= 40;
  //     drawTextWithPagination(
  //       `• Person reserving venue must be 25 years and older`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Fill out your information on booking page allowing you to pick different packages and include any add on as shown.`,
  //       60,
  //     );

  //     // Cancellation Policy
  //     y -= 35;
  //     page.drawText("Incidental deposit", { x: 50, y, size: 14 });
  //     y -= 25;
  //     drawTextWithPagination(
  //       `• A $250 incidental deposit will be included in your final bill and refunded within 5 days after your event, provided there is no damage to the venue or its equipment/supplies, and no overtime use.`,
  //       60,
  //     );

  //     // Damage and Liability
  //     y -= 55;
  //     page.drawText(
  //       "Sales tax - NJ sales tax of 6.625% will apply to venue rental total.",
  //       { x: 50, y, size: 14 },
  //     );
  //     y -= 15;
  //     drawTextWithPagination(
  //       `• Accepted payment methods: Credit cards, bank transfers, Zelle and certified checks`,
  //       60,
  //     );

  //     //  Indemnification
  //     y -= 45;
  //     page.drawText("Cancellation and Refunds:", { x: 50, y, size: 14 });
  //     y -= 25;

  //     drawTextWithPagination(
  //       `• 100% payment due time of booking and fully refundable with in 90 days`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Cancellations 45-89 days before: 75% of deposit refunded`,
  //       60,
  //     );
  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Cancellations less than 45 days before: No refund`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• For rescheduling, please inform us before the 6-week mark. And will credit towards your new date within one year from the original booking, with applicable rescheduling fees`,
  //       60,
  //     );

  //     // Event Conduct
  //     y -= 45;
  //     page.drawText("Payment Methods:", { x: 50, y, size: 14 });
  //     y -= 25;
  //     drawTextWithPagination(
  //       `• Zelle, Venmo, Bank Transfer and Credit Card. Note: A 3% credit card processing fee will be added to the payment.`,
  //       60,
  //     );

  //     y -= 25;
  //     drawTextWithPagination(`• Best to book directly thru website`, 60);

  //     // Force Majeure
  //     y -= 25;
  //     page.drawText("Not allowed on our venue premises:", {
  //       x: 50,
  //       y,
  //       size: 14,
  //     });
  //     y -= 25;
  //     drawTextWithPagination(
  //       `• Smoking permitted only in designated outdoor areas`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• No glitter or confetti including balloons with confetti in them`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(`• No use of tape on venue walls.`, 60);

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• No real flames except for warming food and candles for the event cake. Floating candles allowed as long as they are not exposed flames and in a container`,
  //       60,
  //     );

  //     y -= 25;
  //     drawTextWithPagination(
  //       `• No helium air balloons allowed due to our high ceilings and chandeliers . Regular balloons allowed.`,
  //       60,
  //     );

  //     y -= 25;
  //     drawTextWithPagination(`• No sparklers allowed`, 60);

  //     // Termination of Agreement
  //     y -= 25;
  //     page.drawText("Capacity & Safety", { x: 50, y, size: 14 });
  //     y -= 25;
  //     drawTextWithPagination(`• Maximum capacity: 81 guests, 2 Kitchen`, 60);

  //     y -= 5;
  //     drawTextWithPagination(`• Fire exits must remain unobstructed`, 60);
  //     y -= 5;
  //     drawTextWithPagination(`• Emergency procedures must be followed`, 60);
  //     y -= 5;
  //     drawTextWithPagination(`• Right to refuse entry for safety concerns`, 60);
  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Compliance with all local fire, noise and safety codes required`,
  //       60,
  //     );

  //     // Miscellaneous
  //     y -= 25;
  //     page.drawText("Vendor & Service Requirements", { x: 50, y, size: 14 });
  //     y -= 5;
  //     drawTextWithPagination(
  //       `• All vendors must provide proof of insurance.`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Vendor setup/breakdown times must be coordinated`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Vendors must follow venue loading/unloading procedures`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Certificate of Insurance required before even`,
  //       60,
  //     );

  //     // Acceptance of Terms
  //     y -= 25;
  //     page.drawText("Catering", { x: 50, y, size: 14 });
  //     y -= 25;
  //     drawTextWithPagination(
  //       `• Licensed and insured caterers only - (liability insurance required)`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• We can also share some of our set menus from select vendors to provide add on catering food choices to your event.`,
  //       60,
  //     );

  //     y -= 35;
  //     page.drawText("Alcohol", { x: 50, y, size: 14 });
  //     y -= 25;
  //     drawTextWithPagination(
  //       `• Alcohol service must end 30 minutes before event conclusion`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Professional bartenders required for all alcohol service`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Proof of liquor liability insurance required`,
  //       60,
  //     );

  //     y -= 25;
  //     page.drawText("Property & Liability", { x: 50, y, size: 14 });
  //     y -= 25;
  //     drawTextWithPagination(`• Client responsible for guest conduct`, 60);

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Damage to venue or equipment will be billed`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Personal items must be removed after event`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Venue not responsible for lost/stolen items`,
  //       60,
  //     );

  //     y -= 25;
  //     page.drawText("Sound Regulations", { x: 50, y, size: 14 });
  //     y -= 25;
  //     drawTextWithPagination(
  //       `• Music must comply with local noise ordinances`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(`• Volume control at management discretion`, 60);

  //     y -= 5;
  //     drawTextWithPagination(`• Live music/DJ must provide own equipment`, 60);

  //     y -= 5;
  //     drawTextWithPagination(`• All entertainment must end by 10:30 PM`, 60);

  //     y -= 25;
  //     page.drawText("Unforeseen Circumstances", { x: 50, y, size: 14 });
  //     y -= 25;
  //     drawTextWithPagination(
  //       `• Venue not liable for events beyond control`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Including but not limited to: natural disasters, pandemics, government restrictions`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Alternative dates will be offered if possible`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(`• Changes to Agreement`, 60);

  //     y -= 5;
  //     drawTextWithPagination(
  //       `• Terms subject to change with written notice`,
  //       60,
  //     );

  //     y -= 5;
  //     drawTextWithPagination(`• Disputes resolved through arbitration`, 60);

  //     y -= 5;
  //     drawTextWithPagination(`• New Jersey law governs all agreements`, 60);

  //     // Signature Section
  //     if (y < 100) addNewPage();
  //     y -= 130;

  //     page.drawText("Client Signature:", { x: 50, y, size: 14 });
  //     y -= 30;
  //     page.drawText(
  //       `Date: ${moment(values.dateClient).format("DD-MMMM-YYYY")}`,
  //       {
  //         x: 50,
  //         y,
  //         size: bodyFontSize,
  //       },
  //     );

  //     if (values.clientSignature) {
  //       const base64String = await convertFileToBase64(values.clientSignature);
  //       const signatureImage = await pdfDoc.embedPng(base64String);

  //       // Max dimensions for the signature
  //       const maxWidth = 150; // Reduce width to 150px
  //       const maxHeight = 60; // Reduce height to 60px
  //       let scaledWidth = signatureImage.width;
  //       let scaledHeight = signatureImage.height;

  //       // Maintain aspect ratio
  //       if (
  //         signatureImage.width > maxWidth ||
  //         signatureImage.height > maxHeight
  //       ) {
  //         const scaleFactor = Math.min(
  //           maxWidth / signatureImage.width,
  //           maxHeight / signatureImage.height,
  //         );
  //         scaledWidth = signatureImage.width * scaleFactor;
  //         scaledHeight = signatureImage.height * scaleFactor;
  //       }
  //       // Draw Signature Image
  //       page.drawImage(signatureImage, {
  //         x: 180,
  //         y: height - 230,
  //         width: scaledWidth,
  //         height: scaledHeight,
  //       });
  //     }

  //     // Save PDF to Blob and Open in New Tab
  //     const pdfBytes = await pdfDoc.save();
  //     const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

  //     const reader = new FileReader();
  //     reader.readAsDataURL(pdfBlob);
  //     reader.onloadend = async () => {
  //       const base64String = reader.result?.toString().split(",")[1];

  //       const emailTemplate = `<div>
  //       <p>This is the contract for Booking Id: ${bookingData?.id} </p>
  //       <p>Contact Information: ${bookingData?.fullName} - ${bookingData?.email} </p>
  //       </div>`;

  //       const res = await fetch("/api/contract-send", {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         method: "POST",
  //         body: JSON.stringify({
  //           bookingId: bookingData?.id,
  //           fileName: `${bookingData?.fullName}-contract.pdf`,
  //           fileData: base64String,
  //           mimeType: "application/pdf",
  //           htmlContent: emailTemplate,
  //         }),
  //       });
  //       const data = await res.json();
  //       if (data === 202) {
  //         toast.success("Contract has been sent to owner", {
  //           position: "bottom-right",
  //         });
  //         saveAs(pdfBlob, `${bookingData?.fullName}-contract.pdf`);
  //         setisPostingContract(false);
  //         router.replace(`/payment?bookingId=${bookingId}`);
  //       } else {
  //         toast.error("Error sending Contract", {
  //           position: "bottom-right",
  //         });
  //         setisPostingContract(false);
  //       }
  //     };

  //     // const pdfUrl = URL.createObjectURL(pdfBlob);
  //     // window.open(pdfUrl, "_blank");
  //   } catch (error) {
  //     console.error("Error generating or sending contract", error);
  //   } finally {
  //     setisPostingContract(false);
  //   }
  // };

  return (
    <div className="mt-8 text-[1.375rem] text-white md:text-[2.25rem]">
      <Formik
        initialValues={{
          clientSignature: "",
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
                    value={moment()}
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
