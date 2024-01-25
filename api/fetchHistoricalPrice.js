import axios from "axios";
import mongoose from "mongoose";
import { BitcoinPrice } from "../schemas/bitcoinPrice.js";

// mongoose.connect(process.env.DATABASE_URL);

const formatDate = (date) => date.toISOString().split("T")[0];

const fetchYearlyBitcoinPrice = async (year, month) => {
  const startDate = new Date(year, month, 24);
  const endDate = new Date(year, month, 24); // Adjusted to include time

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  try {
    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${formattedStartDate}&end=${formattedEndDate}`;
    const response = await axios.get(url);
    for (const [date, price] of Object.entries(response.data.bpi)) {
      const histPrice = new BitcoinPrice({
        price: price,
        date: new Date(date),
      });
      await histPrice.save();
    }
    const priceFromDB = await BitcoinPrice.find();
    // await BitcoinPrice.deleteMany();
    console.log(`Data for ${formattedStartDate} to ${formattedEndDate}:`);
    console.log("priceFromDB", priceFromDB);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// fetchYearlyBitcoinPrice(2024, 0)
//   .then(() => mongoose.disconnect())
//   .catch((err) => console.error("Error in fetching or saving data:", err));
