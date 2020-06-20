export function catchErrorMessage (error: Error) {
  if(error.message.indexOf('users_email_unique') !== -1) {
    return 'e-mail já cadastrado!'
  } else if(error.message.indexOf('users_ssn_unique') !== -1) {
    return 'CPF já cadastrado!'
  } else if(error.message.indexOf('users_ein_unique') !== -1) {
    return 'CNPJ já cadastrado!'
  } else if(error.message.indexOf('E_ROW_NOT_FOUND') !== -1) {
    return 'Usuário não cadastrado!'
  }else if(error.message.indexOf('users_whatsapp_unique') !== -1) {
    return 'Whatsapp já cadastrado!'
  }
}
