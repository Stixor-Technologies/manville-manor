import React, { Suspense } from "react";
import InvoicePage from "@/components/invoice";

const Invoice = () => {
  return (
    <Suspense>
      <InvoicePage />
    </Suspense>
  );
};

export default Invoice;
