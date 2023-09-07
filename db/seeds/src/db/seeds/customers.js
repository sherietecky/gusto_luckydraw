exports.seed = function (knex) {
  return knex("customers")
    .del()
    .then(function () {
      return knex("customers").insert([
        {
          name: "John Doe",
          mobileNumber: "1234567890",
          lastDrawDate: null,
        },
        {
          name: "Alice Smith",
          mobileNumber: "9876543210",
          lastDrawDate: null,
        },
      ]);
    });
};
