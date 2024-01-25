import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import saveBitcoinPrice from "./api/fetchPrice.js";
import { BitcoinPrice } from "./schemas/bitcoinPrice.js";
import fetchPricesByPeriod from "./services/fetchPricesByPeriod.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

// cron.schedule("* * * * *", async () => {
//   console.log("Fetching and saving Bitcoin price every minute...");
//   saveBitcoinPrice();
// });

app.get("/api/bitcoin-prices", async (req, res) => {
  const prices = await BitcoinPrice.find().sort("date");
  res.send(prices);
});

app.get("/api/bitcoin-prices/:period", async (req, res) => {
  try {
    const { period } = req.params;
    console.log("period", period);
    const prices = await fetchPricesByPeriod(period);
    res.json(prices);
  } catch (error) {
    res.status(500).send("Error fetching prices");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
