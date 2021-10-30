export class StripeCustomer {
 public readonly customerId: string;
 public readonly stripeCustomerData: StripeCustomerData;
 public readonly apiKeys: StripeApiKeys;

 constructor(customerId, stripeCustomerData, apiKeys) {
  this.customerId = customerId;
  this.stripeCustomerData = stripeCustomerData;
  this.apiKeys = apiKeys;

  return {
   customerId,
   stripeCustomerData,
   apiKeys,
  }
 }
}