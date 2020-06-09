import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SocialMedias extends BaseSchema {
  protected tableName = 'social_medias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('link').unique().notNullable()

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
