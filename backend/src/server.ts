import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import priceRoutes from "./routes/priceRoutes";
import cors from "cors";
import connectDB from "./config/db";
import { swaggerUi, swaggerSpec } from "./swagger";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

// Use CORS middleware with options
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/prices", priceRoutes);

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
