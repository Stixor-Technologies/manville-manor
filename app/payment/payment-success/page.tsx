"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { updatePaymentStatus } from "@/utils/api-calls";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams.get("amount");
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    const fetchInvoice = async () => {
      if (bookingId) {
        try {
          await updatePaymentStatus(Number(bookingId));
        } catch (error) {
          console.error("error", error);
        }
      }
    };

    fetchInvoice();
  });

  return (
    <>
      <div className="p-3 text-center text-white">
        <h1 className="mb-2 text-4xl font-extrabold">Thank you!</h1>
        <h2 className="text-2xl">Your payment was successful</h2>

        <div className="my-2">
          <span>Amount Paid:</span> {`$${amount}`}
        </div>
        <Button
          onClick={() => router.replace("/")}
          size={"lg"}
          className="mt-6"
        >
          Move to Homepage
        </Button>
      </div>
    </>
  );
};

export default PaymentSuccess;
