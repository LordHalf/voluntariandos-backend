import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class PhysicalPeopleController {
  public async index ({ response }: HttpContextContract) {
    const user = await User.query().where('is_juridical', '=', false).andWhere('is_active', '=', true)

    return response.send(user)
  }

  public async store ({ request, response }: HttpContextContract) {
    const dataUser = request.only([
      'full_name',
      'email',
      'password',
      'ssn',
    ])

    await User.create(dataUser)

    return response.status(200)
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const dataUser = request.only([
      'full_name',
      'email',
      'password',
    ])

    const user = await User.findOrFail(params.id)

    if(user.isJuridical === true) {
      return response.send({ message: 'você não tem permissão para editar!' })
    }

    user.merge({ ...dataUser })
    await user.save()

    return response.status(200)
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    user.isActive = false
    user.save()

    return response.status(200)
  }
}
