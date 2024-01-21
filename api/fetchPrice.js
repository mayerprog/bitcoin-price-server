import axios from "axios";
import { BitcoinPrice } from "../schemas/bitcoinPrice.js";

const fetchBitcoinPrice = async () => {
  try {
    const response = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    const price = response.data.bpi.USD.rate_float;
    return price;
  } catch (error) {
    console.error("Error fetching data from API", error);
  }
};

const saveBitcoinPrice = async () => {
  try {
    const price = await fetchBitcoinPrice();
    const bitcoinData = new BitcoinPrice({ price });
    await bitcoinData.save();
    console.log("Bitcoin price saved:", bitcoinData);
  } catch (error) {
    console.error("Error saving data in DB", error);
  }
};

export default saveBitcoinPrice;
