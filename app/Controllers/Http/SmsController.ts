import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import smsConfig from '../../../config/twilio'

const client = require('twilio')(smsConfig.accountSid, smsConfig.authToken)

export default class SmsController {
  public async send ({ request, response }: HttpContextContract) {
    const { sender } = request.all()

    client.messages
      .create({
        body: 'Voluntariandos - Seu codigo de verificação: ',
        from: `+${smsConfig.smsNumber}`,
        to: `+${sender}`,
      })
      .then(() => {
        return response.json({ message: 'Mensagem enviada!' })
      }).catch(() => {
        return response.json({
          message: 'Não foi possível enviar o sms para este número',
        })
      })
  }
}
