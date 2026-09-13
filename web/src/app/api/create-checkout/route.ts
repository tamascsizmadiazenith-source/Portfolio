import { NextRequest, NextResponse } from "next/server";
import { createCheckout } from "@/services/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const items = body.items;
    const origin = request.headers.get("origin") || new URL(request.url).origin;

    const link = await createCheckout(items, origin);
    return NextResponse.json({ url: link });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create Stripe checkout session." },
      { status: 500 },
    );
  }
}
