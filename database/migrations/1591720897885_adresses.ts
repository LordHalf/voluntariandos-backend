import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Adresses extends BaseSchema {
  protected tableName = 'adresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('zipcode').notNullable()
      table.string('city').notNullable()
      table.string('uf', 2).notNullable()
      table.string('street').notNullable()

      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
