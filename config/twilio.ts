import Env from '@ioc:Adonis/Core/Env'

const twilioConfig = {
  authToken: Env.get('TWILIO_AUTH', null),
  accountSid: Env.get('TWILIO_SID', null),
  smsNumber: Env.get('TWILIO_NUMBER', null),
}

export default twilioConfig
