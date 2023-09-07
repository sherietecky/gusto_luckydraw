import knex from "../../db/connection"; // Import the Knex connection

class CustomerModel {
  // Get a customer by mobile number
  async getByMobileNumber(mobileNumber: string) {
    return await knex("customers").where({ mobileNumber }).first();
  }

  // Create a new customer
  async create(customerData: { name: string; mobileNumber: string }) {
    return await knex("customers").insert(customerData).returning("*");
  }

  // Update the lastDrawDate for a customer
  async updateLastDrawDate(mobileNumber: string, lastDrawDate: string) {
    return await knex("customers")
      .where({ mobileNumber })
      .update({ lastDrawDate })
      .returning("*");
  }
}

export default new CustomerModel();
