import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('full_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('ssn')
      table.string('ein')
      table.string('zipcode').notNullable()
      table.boolean('active').defaultTo(false)
      table.boolean('is_juridical').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
