import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

// Lib constants
import { defaultPort, hostName } from "./lib/constants";

// Routes
import { stripeRoutes } from "./modules/stripe";

// Express config
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", stripeRoutes);

app.listen(defaultPort, () =>
  console.log(
    `Contentful local content API running on ${hostName}:${defaultPort}`
  )
);
