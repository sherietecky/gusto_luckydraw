import express from "express";
import {
  getCustomer,
  createCustomer,
  updateLastDrawDate,
} from "../controllers/customerController";

const customerRouter = express.Router();

customerRouter.get("/:mobileNumber", getCustomer); // Get customer by mobile number
customerRouter.post("/", createCustomer); // Create a new customer
customerRouter.put("/:mobileNumber/updateLastDrawDate", updateLastDrawDate); // Update lastDrawDate for a customer

export default customerRouter;
