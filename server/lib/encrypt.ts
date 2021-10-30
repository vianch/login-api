import * as bcrypt from "bcrypt";
import { nanoid } from "nanoid";

async function encrypt(value: string, rounds = 12): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(value, salt);
  } catch (error: unknown) {
    throw new Error(`Hashing password error: ${error}`);
  }
}

async function createApiKey(apiKeys: StripeApiKeys = null): Promise<{
  apiKey: string;
  hashedApiKey: string;
}> {
  try {
    const apiKey = nanoid();
    const hashedApiKey = await encrypt(apiKey);

    // Ensure API key is unique
    if (apiKeys && apiKeys[hashedApiKey]) {
      await createApiKey(apiKeys);
    } else {
      return { apiKey, hashedApiKey };
    }
  } catch (error: unknown) {
    throw new Error(`Creating keys error: ${error}`);
  }
}

export { encrypt, createApiKey };
