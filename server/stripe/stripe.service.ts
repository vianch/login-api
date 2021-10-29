import dotenv from "dotenv";
import Stripe from "stripe";

// Lib constants
import { defaultPort, hostName } from "../lib/constants";

dotenv.config();

export const initStripe = async (apiKey: string): Promise<Stripe> => {
  try {
    return new Stripe(apiKey, {
      apiVersion: "2020-08-27",
    });
  } catch (error: unknown) {
    throw error;
  }
};

export const stripeCreateSession = async (
  stripe: Stripe,
  successEndpoint = "api?apiKey={CHECKOUT_SESSION_ID}",
  cancelEndpoint = "error"
) => {
  if (stripe) {
    try {
      const url = `${hostName}:${defaultPort}`;

      return stripe?.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: process.env.STRIPE_PRICE_KEY,
          },
        ],
        success_url: `${url}/${successEndpoint}`,
        cancel_url: `${url}/${cancelEndpoint}`,
      });
    } catch (error: unknown) {
      throw error;
    }
  }
};

