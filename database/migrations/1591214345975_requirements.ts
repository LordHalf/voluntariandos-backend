import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Requirements extends BaseSchema {
  protected tableName = 'requirements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description')
      table.string('content').notNullable()
      table.integer('user_id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
