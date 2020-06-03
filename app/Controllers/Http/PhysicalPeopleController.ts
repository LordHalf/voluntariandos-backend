import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from '../../Models/User'

export default class PhysicalPeopleController {
  public async index ({ response }: HttpContextContract) {
    const user = await User.query().where('is_juridical', '=', false)

    return response.send(user)
  }

  public async store ({ request, response }: HttpContextContract) {
    const dataUser = request.only([
      'full_name',
      'email',
      'password',
      'ssn',
      'zipcode',
    ])

    await User.create({
      fullName: dataUser.full_name,
      email: dataUser.email,
      password: dataUser.password,
      ssn: dataUser.ssn,
      ein: undefined,
      zipcode: dataUser.zipcode,
    })

    return response.status(200)
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const dataUser = request.only([
      'full_name',
      'email',
      'password',
      'ssn',
      'zipcode',
    ])

    const user = await User.findOrFail(params.id)

    if(user.isJuridical === true) {
      return response.send({ message: '' })
    }

    user.merge({ ...dataUser })
    await user.save()

    return response.status(200)
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()

    return response.status(200)
  }
}
