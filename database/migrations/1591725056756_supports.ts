import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Supports extends BaseSchema {
  protected tableName = 'supports'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('was_accept')

      table
        .integer('physical_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('requiment_id')
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
