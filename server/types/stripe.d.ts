interface StripeSharedData {
  id: string;
  object: string;
}

interface StripeSessionCompleted {
  object: StripeSessionCompletedDataObject
}

interface StripeSessionCompletedDataObject extends StripeSharedData {
  after_expiration?: string;
  allow_promotion_codes?: string;
  amount_subtotal: number;
  amount_total: number;
  billing_address_collection: {
    enabled: boolean, status?: string
  }
  cancel_url: string;
  currency: string;
  customer: string;
  customer_details: StripeCustomerDetails;
  customer_email: string;
  expires_at: number;
  livemode: boolean;
  mode: string;
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: {
    enabled: boolean;
  };
  setup_intent: string;
  subscription: string;
  success_url: string;
  success_url: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  }
  url: string | null;
}

interface StripeCustomerDetails {
  email: string;
  phone: string | null;
  tax_exempt: stri;
  tax_ids: string[];
}

interface StripeCustomerData {
  apiKey: string;
  active: boolean;
  itemId?: string;
  calls?: number;
}

interface StripeApiKeys {
  [key: string]: string
}