import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from '../../Models/User'

export default class JuridicalPeopleController {
  public async index ({ response }: HttpContextContract) {
    const user = await User.query().where('is_juridical', '=', true).andWhere('active', '=', true)

    return response.send(user)
  }

  public async store ({ request, response }: HttpContextContract) {
    const user = request.only([
      'full_name',
      'email',
      'password',
      'ein',
      'zipcode',
      'is_juridical',
      'active',
    ])

    await User.create({
      fullName: user.full_name,
      email: user.email,
      password: user.password,
      ein: user.ein,
      ssn: undefined,
      zipcode: user.zipcode,
      active: false,
      isJuridical: true,
    })
    return response.status(200)
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const dataUser = request.only([
      'full_name',
      'email',
      'password',
      'ein',
      'zipcode',
      'is_juridical',
    ])

    const user = await User.findOrFail(params.id)

    if(user.isJuridical === false) {
      return response.send({ message: 'você não tem permissão para editar!' })
    }

    user.merge({ ...dataUser })
    await user.save()

    return response.status(200)
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    user.active = false
    user.save()

    return response.status(200)
  }
}
