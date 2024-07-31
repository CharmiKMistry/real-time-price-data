"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const priceController_1 = require("./controllers/priceController");
setInterval(priceController_1.fetchAndStorePrices, 10000); // Fetch every 10 seconds
