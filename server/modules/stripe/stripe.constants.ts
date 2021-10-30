import { apiVersion } from "../../lib/constants";

export const stripeRoutesPath = {
  checkout: `${apiVersion}/stripe/checkout`,
  webhook: `${apiVersion}/stripe/webhook`,
};
