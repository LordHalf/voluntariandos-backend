import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import { catchErrorMessage } from '../../utils/catchErrorMessage'

export default class PhysicalPeopleController {
  public async index ({ response }: HttpContextContract) {
    try {
      const user = await User
        .query()
        .where('is_juridical', false)
        .andWhere('is_active', true)

      return response.send(user)
    }catch (error) {
      return response.status(404)
    }
  }

  public async store ({ }: HttpContextContract) {
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const dataUser = request.only([
      'full_name',
      'email',
      'password',
    ])

    try {
      const user = await User.findOrFail(params.id)

      if(user.isJuridical === true) {
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

    try {
      await user.save()

      return response.status(200)
    } catch(error) { }
  }
}
