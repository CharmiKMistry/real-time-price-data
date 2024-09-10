"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const priceSchema = new mongoose_1.Schema({
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});
const Price = (0, mongoose_1.model)('Price', priceSchema);
exports.default = Price;
