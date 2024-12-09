import PaymentSuccessPage from "@/components/payment/payment-success-page";
import { Suspense } from "react";

const PaymentSuccess = () => {
  return (
    <Suspense>
      <PaymentSuccessPage />
    </Suspense>
  );
};

export default PaymentSuccess;
