import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import { catchErrorMessage } from '../../utils/catchErrorMessage'

export default class JuridicalPeopleController {
  public async index ({ response }: HttpContextContract) {
    const user = await User
      .query()
      .where('is_juridical', '=', true)
      .andWhere('is_active', '=', true)

    return response.send(user)
  }

  public async store ({ request, response }: HttpContextContract) {
    const user = request.only([
      'full_name',
      'email',
      'password',
      'ein',
    ])

    try {
      await User.create({
        fullName: user.full_name,
        email: user.email,
        password: user.password,
        ein: user.ein,
        isJuridical: true,
      })
      return response.status(200)
    } catch (error) {
      const message = catchErrorMessage(error)

      if(!message) {
        return response.status(404)
      }
      return response.json({ error: message })
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const dataUser = request.only([
      'full_name',
      'email',
      'password',
    ])

    try {
      const user = await User.findOrFail(params.id)

      if(user.isJuridical === false) {
        return response.json({ error: 'você não tem permissão para editar!' })
      } else if(user.isActive === false) {
        return response.json({ error: 'Usuário não está ativo!' })
      }

      try {
        user.merge({ ...dataUser })
        await user.save()

        return response.status(200)
      } catch(error) {
        const errorMessage = catchErrorMessage(error)

        return response.json({ error: errorMessage})
      }
    } catch (error) {
      const errorMessage = catchErrorMessage(error)

      return response.json({ error: errorMessage})
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    user.isActive = false

    try{
      if(user.isActive === false) {
        return response.json({ message: 'Usuário não está ativo!' })
      }
      await user.save()

      return response.status(200)
    } catch(error) {
      return response.json(error)
    }
  }
}
