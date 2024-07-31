import { Request, Response } from 'express';
import axios from 'axios';
import Price from '../models/price';

const getPrices = async (req: Request, res: Response) => {
  try {
    const prices = await Price.find({}).sort({ timestamp: -1 }).limit(20);
    res.json(prices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const fetchAndStorePrices = async () => {
  const symbols = ['BTC', 'ETH', 'GOOG', 'AAPL', 'AMZN'];
  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

  try {
    const response = await axios.get(apiUrl);
    const { bitcoin, ethereum } = response.data;

    const prices = [
      { symbol: 'BTC', price: bitcoin.usd },
      { symbol: 'ETH', price: ethereum.usd },
    ];

    prices.forEach(async (price) => {
      const newPrice = new Price(price);
      await newPrice.save();
    });

    console.log('Prices saved to database');
  } catch (error: any) {
    console.error(`Error fetching prices: ${error.message}`);
  }
};

export { getPrices, fetchAndStorePrices };
