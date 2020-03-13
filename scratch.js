
exports.up = async function(knex) {
    await knex.schema.createTable("users", table => {
        table.increments();
        table.text("username").notNull().unique()
        table.text("password").notNull()
        table.text("char-name").notNull()
        table.text("race")
        table.text("class")
        table.integer("strength-mod").notNull()
    })

    await knex.schema.createTable("actions", table => {
        table.increments();
        table.text("action-name").notNull()
        table.text("action-type").notNull()
        table.text("dmg-type").notNull()
        table.integer("dice-amt").notNull()
        table.integer("dice").notNull()
        table.integer("to-hit-mod")
        table.integer("dmg-mod")
        table.integer("user-id")
          .references("id")
          .inTable("users")

    })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("actions")
  await knex.schema.dropTableIfExists("users")
};
