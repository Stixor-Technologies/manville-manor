import React, { FC, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { Button } from "../../button";
import { toast } from "react-toastify";
import { REDIRECT_URL } from "@/utils/contants";

interface CheckoutFormProps {
  amount: number;
  bookingId: number;
  isPaid: boolean;
}

const CheckoutForm: FC<CheckoutFormProps> = ({ amount, bookingId, isPaid }) => {
  // const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      // clientSecret,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${REDIRECT_URL}/payment/payment-success?bookingId=${bookingId}&amount=${amount}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(error?.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      console.error("err", error?.message);
    } else {
      toast.error("An unexpected error occurred, Try again later", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="text-white">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button
        loading={isLoading}
        disabled={isLoading || !stripe || !elements || isPaid}
        id="submit"
        className="mt-4 w-full"
      >
        {isPaid ? "Already Paid" : "Pay now"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
