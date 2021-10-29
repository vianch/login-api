import dotenv from "dotenv";

dotenv.config();

export const apiVersion = "/v1";
export const defaultPort = process.env.API_PORT || 4001;
export const hostName = process.env.API_HOST || "https://localhost";