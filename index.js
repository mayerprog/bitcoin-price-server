import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import saveBitcoinPrice from "./api/fetchPrice.js";
import { BitcoinPrice } from "./schemas/bitcoinPrice.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

cron.schedule("* * * * *", async () => {
  console.log("Fetching and saving Bitcoin price...");
  saveBitcoinPrice();
});

app.get("/api/bitcoin-prices", async (req, res) => {
  const prices = await BitcoinPrice.find().sort("date");
  res.send(prices);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
