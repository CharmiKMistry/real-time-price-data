"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndStorePrices = exports.getPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const price_1 = __importDefault(require("../models/price"));
const getPrices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prices = yield price_1.default.find({}).sort({ timestamp: -1 }).limit(20);
        res.json(prices);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPrices = getPrices;
const fetchAndStorePrices = () => __awaiter(void 0, void 0, void 0, function* () {
    const symbols = ['BTC', 'ETH', 'GOOG', 'AAPL', 'AMZN'];
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';
    try {
        const response = yield axios_1.default.get(apiUrl);
        const { bitcoin, ethereum } = response.data;
        const prices = [
            { symbol: 'BTC', price: bitcoin.usd },
            { symbol: 'ETH', price: ethereum.usd },
        ];
        prices.forEach((price) => __awaiter(void 0, void 0, void 0, function* () {
            const newPrice = new price_1.default(price);
            yield newPrice.save();
        }));
        console.log('Prices saved to database');
    }
    catch (error) {
        console.error(`Error fetching prices: ${error.message}`);
    }
});
exports.fetchAndStorePrices = fetchAndStorePrices;
