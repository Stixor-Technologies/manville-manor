import { Suspense } from "react";
import PaymentPage from "@/components/payment/payment-page";

const Payment = () => {
  return (
    <Suspense>
      <PaymentPage />
    </Suspense>
  );
};

export default Payment;
