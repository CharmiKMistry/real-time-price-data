import express from "express";
import { getPrices } from "../controllers/priceController";

const router = express.Router();

/**
 * @swagger
 * /sample:
 *   get:
 *     summary: Retrive Price Data
 *     description: This is a sample endpoint
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/", getPrices);

export default router;
