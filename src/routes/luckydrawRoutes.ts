import express from "express";
import { initiateDraw, redeemPrize } from "../controllers/luckydrawController";

const luckydrawRouter = express.Router();

// Define routes related to Lucky Draw
luckydrawRouter.post("/draw", initiateDraw); // Initiate a lucky draw
luckydrawRouter.post("/redeem", redeemPrize); // Redeem a prize

export default luckydrawRouter;
