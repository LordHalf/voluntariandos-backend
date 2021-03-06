import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Requirements extends BaseSchema {
  protected tableName = 'requirements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description')
      table.text('content').notNullable()
      table.boolean('was_suplied').defaultTo(false)

      table
        .integer('juridical_id')
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
