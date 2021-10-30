import express, { Request, Response } from "express";
import dotenv from "dotenv";

// Constants
import { stripeRoutesPath } from "./stripe.constants";
import { stripeWebhookController } from "./stripe.controller";

// Services
import { stripeCreateSession } from "./stripe.service";

// Config
dotenv.config();
const stripeRoutes = express.Router();

stripeRoutes.get("/api", (request: Request, response: Response): void => {
  const apiKey = request?.query?.apiKey;

  response.send({
    date: `🥷🏼 APIKEY VALUE: ${apiKey || "No key"} `,
  });
});

stripeRoutes.get(
  stripeRoutesPath.checkout,
  async (request: Request, response: Response): Promise<boolean> => {
    const stripeSession = await stripeCreateSession();

    if (stripeSession) {
      response.send(stripeSession);
      return true;
    }

    response?.sendStatus(500);
    return false;
  }
);

stripeRoutes.post(
  stripeRoutesPath.webhook,
  express.json({ type: "application/json" }),
  async (request: Request, response: Response): Promise<Response> =>
    stripeWebhookController(request, response)
);

export default stripeRoutes;
