import { Product } from "@/types/products";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")("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");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cart, email } = req.body;

    const modifiedItems = cart.map((item: Product) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["BD", "US", "OM", "CA", "GB"],
      },
      line_items: modifiedItems,
      mode: "payment",
      success_url: `https://catalog-gamma.vercel.app/success`,
      cancel_url: `https://catalog-gamma.vercel.app/checkout`,
      metadata: {
        email,
        images: JSON.stringify(cart.map((item: any) => item.image)),
      },
    });

    res.status(200).json({
      id: session.id,
    });
  } catch (error) {
    console.error("Помилка при обробці оплати через Stripe:", error);

    res.status(500).json({ error: "Помилка при обробці оплати через Stripe" });
  }
}
