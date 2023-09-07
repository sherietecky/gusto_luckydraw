import { Request, Response } from "express";
import CustomerModel from "../models/Customer";
import PrizeModel from "../models/Prize";

// Define probabilities for each prize category
const probabilities = {
  "$5 Cash Coupon": 0.5,
  "$2 Cash Coupon": 2,
  "Buy 1 Get 1 Free Coupon": 80,
  "No Prize": 17.5,
};

// Function to initiate a lucky draw
export const initiateDraw = async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.body;

    // Find the customer by mobile number
    const customer = await CustomerModel.getByMobileNumber(mobileNumber);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    // Check if the customer is eligible to draw based on the last draw date
    const today = new Date().toDateString();
    if (customer.lastDrawDate === today) {
      return res
        .status(400)
        .json({ message: "You can only draw once per day." });
    }

    // Perform the lucky draw based on probabilities
    const prize = performLuckyDraw(probabilities);

    // Check and decrement the daily and total quotas for the prize category
    const prizeInfo = await PrizeModel.getByCategory(prize);

    if (!prizeInfo) {
      return res.status(500).json({ message: "Invalid prize category." });
    }

    if (prizeInfo.dailyQuota <= 0 || prizeInfo.totalQuota <= 0) {
      return res.status(400).json({ message: "Prize quota exceeded." });
    }

    // Update customer's last draw date
    customer.lastDrawDate = today;
    await CustomerModel.updateLastDrawDate(mobileNumber, today);

    // Decrement quotas
    await PrizeModel.decrementQuotas(prize);

    // Return the draw result
    return res.status(200).json({ message: `You won: ${prize}` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during the draw." });
  }
};

// Function to perform a lucky draw based on probabilities
function performLuckyDraw(probabilityMap: { [key: string]: number }): string {
  const randomValue = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const prize in probabilityMap) {
    cumulativeProbability += probabilityMap[prize];

    if (randomValue <= cumulativeProbability) {
      return prize;
    }
  }

  // If no prize is selected, return "No Prize"
  return "No Prize";
}

// Function to redeem a prize
export const redeemPrize = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, prizeCategory } = req.body;

    // Find the customer by mobile number
    const customer = await CustomerModel.getByMobileNumber(mobileNumber);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    // Check if the customer has won the specified prize category
    const hasPrize = await PrizeModel.hasPrize(mobileNumber, prizeCategory);

    if (!hasPrize) {
      return res
        .status(400)
        .json({ message: "You do not have this prize to redeem." });
    }

    // Implement the logic to redeem the prize, e.g., send an SMS or generate a coupon code

    // Return a success message or details of the redeemed prize
    return res
      .status(200)
      .json({ message: `Prize redeemed: ${prizeCategory}` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during prize redemption." });
  }
};
