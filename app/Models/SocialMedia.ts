import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SocialMedia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: number

  @column()
  public link: string

  @column()
  public contactId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
