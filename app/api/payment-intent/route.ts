import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "@/utils/contants";

const stripe = new Stripe(STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { amount, bookingId } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { bookingId },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: error?.statusCode || 400 },
    );
  }
}
