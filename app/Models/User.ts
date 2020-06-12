import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  beforeSave,
  column, hasOne,
  HasOne, hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import Telefone from './Telefone'
import Adress from './Adress'
import Support from './Support'
import SocialMedia from './SocialMedia'
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

  @hasOne(() => Telefone)
  public telefone: HasOne<typeof Telefone>

  @hasOne(() => Adress)
  public adress: HasOne<typeof Adress>

  @hasOne(() => Support)
  public support: HasOne<typeof Support>

  @hasOne(() => SocialMedia)
  public socialMedia: HasOne<typeof SocialMedia>

  @hasMany(() => Requirement)
  public requiment: HasMany<typeof Requirement>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
