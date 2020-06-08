import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from 'App/Models/User'

export default class AuthController {
  public async login ({ request, auth, response }: HttpContextContract) {
    const user = request.only([
      'email',
      'password',
    ])

    auth.attempt(user.email, user.password).then((success) => {
      return response.json(success)
    }).catch((error) => {
      return response.json(error)
    })
  }
}
