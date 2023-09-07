exports.up = function (knex) {
  return knex.schema.createTable('prizes', function (table) {
    table.increments('id').primary();
    table.string('category').notNullable();
    table.string('name').notNullable();
    table.integer('totalQuota').notNullable();
    table.integer('dailyQuota').notNullable();
    table.integer('remainingQuota').notNullable();
    table.float('probability').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('prizes');
};