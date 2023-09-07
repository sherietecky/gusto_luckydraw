import { Request, Response } from "express";
import CustomerModel from "../models/Customer";

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.params;

    // Get the customer by mobile number
    const customer = await CustomerModel.getByMobileNumber(mobileNumber);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the customer." });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, mobileNumber } = req.body;

    // Check if the customer with the same mobile number already exists
    const existingCustomer = await CustomerModel.getByMobileNumber(
      mobileNumber
    );

    if (existingCustomer) {
      return res
        .status(400)
        .json({
          message: "Customer with the same mobile number already exists.",
        });
    }

    // Create a new customer
    const newCustomer = await CustomerModel.create({ name, mobileNumber });

    return res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the customer." });
  }
};

export const updateLastDrawDate = async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.params;
    const { lastDrawDate } = req.body;

    // Update the lastDrawDate for the customer
    const updatedCustomer = await CustomerModel.updateLastDrawDate(
      mobileNumber,
      lastDrawDate
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    return res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Error updating lastDrawDate:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating lastDrawDate." });
  }
};
