import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Telefones extends BaseSchema {
  protected tableName = 'telefones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('adress_id')
      table.integer('number')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
