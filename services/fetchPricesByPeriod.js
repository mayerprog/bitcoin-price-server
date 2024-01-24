import { BitcoinPrice } from "../schemas/bitcoinPrice.js";

const getStartDate = (period) => {
  const date = new Date();
  switch (period) {
    case "day":
      date.setDate(date.getDate() - 1);
      break;
    case "week":
      date.setDate(date.getDate() - 7);
      break;
    case "month":
      date.setMonth(date.getMonth() - 1);
      break;
    case "year":
      date.setFullYear(date.getFullYear() - 1);
      break;
    default:
      throw new Error("Invalid period");
  }
  return date;
};

const fetchPricesByPeriod = async (period) => {
  try {
    const startDate = getStartDate(period);
    startDate.setUTCHours(0, 0, 0, 0); // Adjust to the start of the day in UTC
    console.log("startDate", startDate);
    const prices = await BitcoinPrice.find({
      date: { $gte: startDate },
    }).sort({ date: 1 }); // Сортировка по возрастанию даты
    console.log("prices", prices);

    return prices;
  } catch (error) {
    console.error("Error fetching data from DB", error);
    throw error;
  }
};

export default fetchPricesByPeriod;
