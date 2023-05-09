import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { metrics } from './metrics'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.post('/sessions', authenticate)
  app.get('/metrics', { onRequest: [verifyJWT] }, metrics)
}
