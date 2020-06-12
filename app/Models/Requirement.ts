import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Support from './Support'

export default class Requirement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public content: string

  @column()
  public wasSuplied: boolean

  @column()
  public juridicalId: number

  @hasMany(() => Support)
  public support: HasMany<typeof Support>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
