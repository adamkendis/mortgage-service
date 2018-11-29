// Migration for MariaDB

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('house', table => {
      table.integer('_id').primary().notNullable();
      table.string('address', 60);
      table.string('city', 30);
      table.integer('zip');
      table.integer('zestimate');
      table.integer('beds');
      table.decimal('baths');
      table.integer('sqft');
      table.string('status', 10);
      table.decimal('taxassessment', 10, 2);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('house')
};