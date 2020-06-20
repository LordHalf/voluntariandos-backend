import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  beforeSave,
  column, hasOne,
  HasOne, hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import Adress from './Adress'
import Support from './Support'
import Requirement from './Requirement'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fullName: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public whatsapp: number

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column()
  public ssn: number

  @column()
  public ein: number

  @column()
  public isActive: boolean

  @column()
  public isJuridical: boolean

  @hasOne(() => Adress)
  public adress: HasOne<typeof Adress>

  @hasOne(() => Support)
  public support: HasOne<typeof Support>

  @hasMany(() => Requirement)
  public requiment: HasMany<typeof Requirement>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
