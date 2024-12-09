"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/payment/checkout-form";
import { Appearance, StripeElementsOptions } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/utils/contants";
import { useSearchParams } from "next/navigation";
import { getInvoice } from "@/utils/api-calls";
import Spinner from "@/components/shared/spinner";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY!);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    (async () => {
      if (bookingId) {
        try {
          setisLoading(true);
          const resp = await getInvoice(Number(bookingId));
          if (resp) {
            setInvoiceAmount(resp?.invoice?.totalPrice);
            setIsPaid(resp?.isPaid);
            const res = await fetch("/api/payment-intent", {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify({ amount: resp?.invoice?.totalPrice }),
            });
            const data = await res.json();
            setClientSecret(data?.clientSecret);
          }
        } catch (error) {
          console.error("error", error);
        } finally {
          setisLoading(false);
        }
      }
    })();
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#74604B",
      colorBackground: "#282828",
      colorText: "#ffffff",
    },
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex min-h-[23.9375rem] items-center justify-center">
          <Spinner />
        </div>
      ) : (
        clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              amount={invoiceAmount}
              bookingId={Number(bookingId)}
              isPaid={isPaid}
            />
          </Elements>
        )
      )}
    </div>
  );
};

export default Payment;
