// The up function is where we define what we want the migration to do
exports.up = function(knex) {
  return knex.schema.createTable('lunch_week', function(table) {
    table.increments('lunch_week_id') // auto-numbering primary key column
    table.date('week_of').notNullable()
    table.boolean('is_published').notNullable().defaultTo(false)
  })
}

// The down function is where we define a rollback or undo action.
exports.down = function(knex) {
  // if we wanted to undo this migration, then we would drop the table
  return knex.schema.dropTable('lunch_week')
}
