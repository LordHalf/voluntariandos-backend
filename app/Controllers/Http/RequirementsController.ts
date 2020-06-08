import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Requirement from 'App/Models/Requirement'

export default class RequirementsController {
  public async index ({ }) {
    const requirements = await Requirement.all()

    return requirements
  }

  public async store ({ request, response }: HttpContextContract) {
    const requirement = request.only([
      'title',
      'description',
      'content',
      'idJuridical',
    ])

    await Requirement.create(requirement)

    return response.status(200)
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const updateRequirement = request.only(['title', 'description', 'content'])

    const requirement = await Requirement.findOrFail(params.id)

    requirement.merge({ ...updateRequirement })
    await requirement.save()

    return response.status(200)
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const requirement = await Requirement.findOrFail(params.id)

    await requirement.delete()

    return response.status(200)
  }
}