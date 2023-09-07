import { Knex } from "knex";

// Define the Knex instance for your PostgreSQL database connection
const knex: Knex = require("knex")({
  client: "pg",
  connection: {
    host: "your-database-host",
    user: "your-database-user",
    password: "your-database-password",
    database: "your-database-name",
  },
});

// Define the PrizeModel
class PrizeModel {
  // Function to check if a customer has won a specific prize
  static async hasPrize(
    customerMobileNumber: string,
    prizeCategory: string
  ): Promise<boolean> {
    const result = await knex("customer_prizes")
      .where({
        customer_mobile_number: customerMobileNumber,
        prize_category: prizeCategory,
      })
      .count("* as count")
      .first(); // Use .first() to retrieve the first row as an object

    if (result) {
      // Extract the count from the result and convert it to a number
      const count = Number(result.count);

      // If count is greater than 0, the customer has won this prize
      return count > 0;
    }

    return false; // Default to false if no result is found
  }

  // Function to decrement the quotas for a specific prize category
  static async decrementQuotas(prizeCategory: string): Promise<void> {
    await knex("prizes")
      .where("category", prizeCategory)
      .decrement("daily_quota", 1)
      .decrement("total_quota", 1);
  }

  static async getById(id: number): Promise<any | null> {
    const prize = await knex("prizes").where({ id }).first();
    return prize || null;
  }

  static async getByCategory(category: string): Promise<any | null> {
    const prize = await knex("prizes").where({ category }).first();
    return prize || null;
  }

  static async updateRemainingQuota(
    category: string,
    dailyQuota: number,
    totalQuota: number
  ): Promise<void> {
    await knex("prizes")
      .where({ category })
      .update({ daily_quota: dailyQuota, total_quota: totalQuota });
  }
}

export default PrizeModel;
