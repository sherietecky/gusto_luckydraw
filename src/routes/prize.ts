import express from "express";
import { getPrize, updateRemainingQuota } from "../controllers/prizeController";

const prizeRouter = express.Router();

// Define prize routes
prizeRouter.get("/:id", getPrize); // Get prize by ID
prizeRouter.put("/:id/updateRemainingQuota", updateRemainingQuota); // Update remainingQuota for a prize

export default prizeRouter;
