import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Requirement from 'App/Models/Requirement'

export default class RequirementsController {
  public async index ({ response }) {
    const requirements = await Requirement.all()

    return response.json(requirements)
  }

  public async store ({ request, response }: HttpContextContract) {
    const requirement = request.only([
      'title',
      'description',
      'content',
      'idJuridical',
    ])

    try {
      await Requirement.create(requirement)

      return response.status(200)
    } catch (error) { }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const updateRequirement = request.only(['title', 'description', 'content'])

    const requirement = await Requirement.findOrFail(params.id)

    requirement.merge({ ...updateRequirement })

    try {
      await requirement.save()

      return response.status(200)
    } catch (error) { }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const requirement = await Requirement.findOrFail(params.id)

    try {
      await requirement.delete()

      return response.status(200)
    } catch (error) { }
  }
}
