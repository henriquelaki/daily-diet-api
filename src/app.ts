import { fastifyJwt } from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { mealsRoutes } from './http/controllers/meals/routes'
import { usersRoutes } from './http/controllers/users/routes'
import { NoDataFoundError } from './use-cases/errors/no-data-found-error'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(usersRoutes)
app.register(mealsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError)
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })

  if (error instanceof NoDataFoundError || error.code === 'P2025') {
    return reply.status(404).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') console.error(error)
  else {
    // TODO: Send error to External Service
  }

  return reply.status(500).send({ message: error.message })
})
