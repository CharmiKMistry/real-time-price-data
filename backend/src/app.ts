import { fetchAndStorePrices } from './controllers/priceController';

setInterval(fetchAndStorePrices, 10000); // Fetch every 10 seconds
