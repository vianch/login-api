import dotenv from "dotenv";
import Stripe from "stripe";
import { createApiKey } from "../../lib";

// Lib constants
import { defaultPort, hostName } from "../../lib/constants";
import { StripeCustomer } from "./stripe.models";

dotenv.config();

export const initStripe = async (apiKey: string): Promise<Stripe> => {
  try {
    return new Stripe(apiKey, {
      apiVersion: "2020-08-27",
    });
  } catch (error: unknown) {
    throw new Error(`Stripe init session: ${error}`);
  }
};

export const stripeCreateSession = async (
  successEndpoint = "api?apiKey={CHECKOUT_SESSION_ID}",
  cancelEndpoint = "error"
) => {
  const stripe: Stripe = await initStripe(process.env.STRIPE_SECRET_KEY || "");

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
      throw new Error(`Stripe creating session error: ${error}`);
    }
  }
};

// TODO: remove logs
export const stripeSessionCompleted = async (
  data: StripeSessionCompleted
): Promise<boolean> => {
  const stripe: Stripe = await initStripe(process.env.STRIPE_SECRET_KEY || "");
  const customerId = data?.object.customer;
  const subscriptionId = data?.object.subscription;

  console.log(`💰 Customer ${customerId} subscribed to plan ${subscriptionId}`);

  // TODO: here should read the user from database and key apiKEys
  const apiKeys: StripeApiKeys = {} as StripeApiKeys;

  // Generate API keys
  const { apiKey, hashedApiKey } = await createApiKey(apiKeys);
  console.log(`User's API Key: ${apiKey}`);
  console.log(`Hashed API Key: ${hashedApiKey}`);

  // TODO: Store the API key in the database. (CREATE A DIFFERENT SERVICES FOR THIS)
  apiKeys[hashedApiKey] = customerId;
  const customerData: StripeCustomerData = {
    apiKey: hashedApiKey,
    active: true,
  } as StripeCustomerData;
  const customer: StripeCustomer = new StripeCustomer(
    customerId,
    customerData,
    apiKeys
  );

  console.log(`🧑‍💻 Customer: ${customer}`);
  return true;
};
