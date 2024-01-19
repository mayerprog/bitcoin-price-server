import axios from "axios";

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

const BitcoinPrice = await fetchBitcoinPrice();

console.log("BitcoinPrice", BitcoinPrice);

export default fetchBitcoinPrice;
