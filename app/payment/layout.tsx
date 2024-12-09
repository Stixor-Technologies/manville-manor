export default function PaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mx-auto my-20 max-w-[35rem] rounded-md bg-dark-gray p-4">
      {children}
    </section>
  );
}
