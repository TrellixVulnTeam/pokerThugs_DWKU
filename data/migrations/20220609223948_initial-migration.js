
exports.up = async function(knex) {
  await knex.schema
    .createTable('users', tbl => {
        tbl.increments()
        tbl.string('username', 32).notNullable().unique()
        tbl.string('email').notNullable().unique()
        tbl.string('password').notNullable().unique()
    })
};


exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('users')
  
};
