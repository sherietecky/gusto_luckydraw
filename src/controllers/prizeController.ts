import { Request, Response } from "express";
import PrizeModel from "../models/Prize";

export const getPrize = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get the prize by ID
    const prize = await PrizeModel.getById(parseInt(id, 10));

    if (!prize) {
      return res.status(404).json({ message: "Prize not found." });
    }

    return res.status(200).json(prize);
  } catch (error) {
    console.error("Error fetching prize:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the prize." });
  }
};

export const updateRemainingQuota = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { dailyQuota, totalQuota } = req.body;

    // Update the remainingQuota for the prize category
    await PrizeModel.updateRemainingQuota(category, dailyQuota, totalQuota);

    return res
      .status(200)
      .json({ message: "Remaining quota updated successfully." });
  } catch (error) {
    console.error("Error updating remaining quota:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating remaining quota." });
  }
};
