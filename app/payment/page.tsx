"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout-form";

// import CheckoutForm from "../components/CheckoutForm";
// import CompletePage from "../components/CompletePage";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const Payment = () => {
  const [clientSecret, setClientSecret] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);

  React.useEffect(() => {
    setConfirmed(
      new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret",
      ),
    );
  });

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 2000 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log("confirmed", confirmed);

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? (
            // <CompletePage />
            <div>Complete Page</div>
          ) : (
            <CheckoutForm />
          )}
        </Elements>
      )}
    </div>
  );
};

export default Payment;
