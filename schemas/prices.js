import mongoose from "mongoose";

const bitcoinPrice = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  price: Number,
});

const bitcoinPriceSchema = mongoose.model("bitcoinPrice", bitcoinPrice);

export { bitcoinPriceSchema as BitcoinPrice };
