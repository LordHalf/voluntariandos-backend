import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SocialMedias extends BaseSchema {
  protected tableName = 'social_medias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('adress_id')
      table.string('logo')
      table.increments('link')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
