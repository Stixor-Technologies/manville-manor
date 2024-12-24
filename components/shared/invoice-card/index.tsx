"use client";
import React, { FC } from "react";

type InvoiceCardProps = {
  invoiceData: any;
};

const InvoiceCard: FC<InvoiceCardProps> = ({ invoiceData }) => {
  return (
    <div className="rounded-md bg-secondary p-6">
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
        <p className="ml-3 mt-4 text-[1.5rem] md:text-[1.625rem]">Items (3)</p>
      </div>

      <ul className="text-[1.375rem]">
        <li className="mt-6 flex justify-between font-semibold text-black">
          <span className="">Package Price</span>
          <span className="">${invoiceData?.items?.packagePrice}</span>
        </li>
        <li className="mt-2 flex justify-between font-semibold text-black">
          <span>Extras</span>
          <span>
            ${invoiceData?.totalPrice - invoiceData?.items?.packagePrice}
          </span>
        </li>
        <li className="px-6">
          <ul className="mt-2 space-y-2 text-black/65">
            <li className="flex justify-between">
              <span>Catering</span>
              <span>${invoiceData?.items?.cateringTotal}</span>
            </li>

            <li className="flex justify-between">
              <span>Additional Services</span>
              <span>${invoiceData?.items?.additionalServices}</span>
            </li>

            <li className="flex justify-between">
              <span>Incidental Desposit (Refundable)</span>
              <span>${invoiceData?.items?.incidentalDeposit}</span>
            </li>
          </ul>
        </li>
      </ul>

      <div className="mx-auto mt-4 h-[0.0625rem] w-full bg-[#B0B0B0]" />

      <div className="mt-4 flex justify-between">
        <h3 className=" text-4xl text-black">Order Total:</h3>
        <p className="text-[1.375rem] font-semibold text-black">
          ${invoiceData?.totalPrice}
        </p>
      </div>
    </div>
  );
};

export default InvoiceCard;
