import dotenv from "dotenv";
import { Request, Response } from "express";

// Service
import { stripeSessionCompleted } from "./stripe.service";

// Config
dotenv.config();

// TODO: create error and success responses answer, middleware and formats
export const stripeWebhookController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const data = request?.body?.data;
  const eventType = request?.body?.type;

  if (data && eventType) {
    switch (eventType) {
      case "checkout.session.completed":
        await stripeSessionCompleted(data);
        break;
      case "invoice.paid":
        break;
      case "invoice.payment_failed":
        break;
      default:
        console.log(`Unhandled event type ${eventType}`);
    }

    return response?.sendStatus(200);
  }

  return response?.sendStatus(404);

};
