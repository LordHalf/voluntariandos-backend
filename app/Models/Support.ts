import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Support extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public was_accept: boolean

  @column()
  public physical_id: number

  @column()
  public requiment_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
