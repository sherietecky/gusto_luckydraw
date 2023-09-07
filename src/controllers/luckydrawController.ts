import { Request, Response } from 'express';
import Customer from '../models/Customer';
import Prize from '../models/Prize';

// Function to initiate a lucky draw
export const draw = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.body; // Assuming you pass the customer's ID in the request

    // Check if the customer has already drawn today
    const customer = await Customer.findByPk(customerId);
    if (customer) {
      const currentDate = new Date();
      if (
        customer.lastDrawDate &&
        customer.lastDrawDate.toDateString() === currentDate.toDateString()
      ) {
        return res.status(400).json({ message: 'You can only draw once per day.' });
      }
    }

    // Fetch available prizes from the database
    const availablePrizes = await Prize.findAll({
      where: {
        remainingQuota: {
          $gt: 0,
        },
      },
    });

    // Check if there are available prizes
    if (availablePrizes.length === 0) {
      return res.status(400).json({ message: 'No prizes are available.' });
    }

    // Calculate the total probability for available prizes
    const totalProbability = availablePrizes.reduce(
      (total: any, prize: any) => total + prize.probability,
      0
    );

    // Generate a random number between 0 and totalProbability
    const randomNumber = Math.random() * totalProbability;

    // Find the prize based on the random number and probabilities
    let selectedPrize: Prize | null = null;
    let accumulatedProbability = 0;

    for (const prize of availablePrizes) {
      accumulatedProbability += prize.probability;

      if (randomNumber <= accumulatedProbability) {
        selectedPrize = prize;
        break;
      }
    }

    // If a prize is selected, update the customer's last draw date and prize information
    if (selectedPrize) {
      // Update the customer's last draw date
      customer.lastDrawDate = new Date();
      await customer.save();

      // Decrement the remaining quota for the selected prize
      selectedPrize.remainingQuota -= 1;
      await selectedPrize.save();

      return res.status(200).json({ message: `Congratulations! You won ${selectedPrize.name}` });
    } else {
      return res.status(200).json({ message: 'Sorry, you did not win any prize this time.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while processing the draw.' });
  }
};

// Function to redeem prizes (assuming you have a separate endpoint for redemption)
export const redeem = async (req: Request, res: Response) => {
  try {
    const { customerId, prizeId } = req.body; // Assuming you pass the customer's ID and prize ID in the request

    // Check if the prize is valid and available for redemption
    const prize = await Prize.findOne({
      where: {
        id: prizeId,
        remainingQuota: {
          $gt: 0,
        },
      },
    });

    if (!prize) {
      return res.status(400).json({ message: 'Invalid or unavailable prize.' });
    }

    // Update the customer's record to indicate that they've redeemed the prize
    const customer = await Customer.findByPk(customerId);
    if (customer) {
      // Implement logic to mark the prize as redeemed by the customer in your database
      // For example, you can create a separate table to track prize redemption history

      return res.status(200).json({ message: `You have successfully redeemed ${prize.name}.` });
    } else {
      return res.status(400).json({ message: 'Customer not found.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while processing the redemption.' });
  }
};