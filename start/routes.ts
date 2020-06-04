import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/', 'JuridicalPeopleController.index')
  Route.post('/', 'JuridicalPeopleController.store')
  Route.put('/:id', 'JuridicalPeopleController.update')
  Route.delete('/:id', 'JuridicalPeopleController.destroy')
}).prefix('/juridical')

Route.group(() => {
  Route.get('/', 'PhysicalPeopleController.index')
  Route.post('/', 'PhysicalPeopleController.store')
  Route.put('/:id', 'PhysicalPeopleController.update')
  Route.delete('/:id', 'PhysicalPeopleController.destroy')
}).prefix('/physical')

Route.post('/sms', 'SmsController.send')
