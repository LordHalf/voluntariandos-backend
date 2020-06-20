import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

import { catchErrorMessage } from '../../utils/catchErrorMessage'

export default class AuthController {
  public async signIn ({ request, response }: HttpContextContract) {
    const authUser = request.only(['email', 'password'])

    try {
      const user = await User.findByOrFail('email', authUser.email)

      const hashPassword = await Hash.verify(user.password, authUser.password)

      if(hashPassword){
        return response.json({ user: user })
      }
    } catch (error) {
      if(error.message.indexOf('E_ROW_NOT_FOUND') !== -1) {
        return response.json({message: 'E-mail não cadastrado!'})
      }
      return response.status(404)
    }
  }

  public async register ({ request, response }: HttpContextContract) {
    const dataUser = request.all()

    try {
      const user = await User.create(dataUser.user)
      await user.related('adress').create(dataUser.adress)

      return response.status(200)
    } catch (error) {
      const message = catchErrorMessage(error)

      if(!message) {
        return response.status(404)
      }
      return response.json({ error: message })
    }
  }
}
