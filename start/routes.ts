/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

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
