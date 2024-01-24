import axios from "axios";
const formatDate = (date) => date.toISOString().split("T")[0];

const fetchYearlyBitcoinPrice = async (year, month) => {
  const startDate = new Date(year - 1, month, 1);
  const endDate = new Date(); // Adjusted to include time

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  try {
    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${formattedStartDate}&end=${formattedEndDate}`;
    const response = await axios.get(url);

    console.log(`Data for ${formattedStartDate} to ${formattedEndDate}:`);
    console.log(response.data.bpi);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const result = await fetchYearlyBitcoinPrice(2024, 0);
console.log(result);
