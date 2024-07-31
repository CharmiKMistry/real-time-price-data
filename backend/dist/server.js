"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const priceRoutes_1 = __importDefault(require("./routes/priceRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Configure CORS options
const corsOptions = {
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};
// Use CORS middleware with options
app.use((0, cors_1.default)());
// Middleware to parse JSON and URL-encoded data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/prices", priceRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
