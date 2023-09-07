exports.seed = function (knex) {
  return knex("prizes")
    .del()
    .then(function () {
      return knex("prizes").insert([
        {
          category: "$5 Cash Coupon",
          name: "Five Dollar Coupon",
          totalQuota: 500,
          dailyQuota: 100,
          remainingQuota: 500,
          probability: 0.5,
        },
        {
          category: "$2 Cash Coupon",
          name: "Two Dollar Coupon",
          totalQuota: 5000,
          dailyQuota: 500,
          remainingQuota: 5000,
          probability: 2,
        },
        {
          category: "Buy 1 Get 1 Free Coupon",
          name: "BOGO Coupon",
          totalQuota: -1,
          dailyQuota: -1,
          remainingQuota: -1,
          probability: 80,
        },
        {
          category: "No Prize",
          name: "No Prize",
          totalQuota: -1,
          dailyQuota: -1,
          remainingQuota: -1,
          probability: 17.5,
        },
      ]);
    });
};
