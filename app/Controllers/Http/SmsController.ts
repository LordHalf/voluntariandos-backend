import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import smsConfig from '../../../config/twilio'

const client = require('twilio')(smsConfig.accountSid, smsConfig.authToken)

export default class SmsController {
  public async send ({ request, response }: HttpContextContract) {
    const { sender } = request.all()

    client.messages
      .create({
        body: '',
        from: `+${smsConfig.smsNumber}`,
        to: `+${sender}`,
      })
      .then(() => {
        return response.send(200)
      }).catch(() => {
        return response.send({
          message: 'Não foi possível enviar o sms para este número',
        })
      })
  }
}
