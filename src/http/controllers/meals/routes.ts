import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { list } from './list'
import { register } from './register'
import { remove } from './remove'
import { search } from './search'
import { update } from './update'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/meals', register)
  app.get('/meals', list)
  app.get('/meals/:mealId', search)
  app.patch('/meals/:mealId', update)
  app.delete('/meals/:mealId', remove)
}
