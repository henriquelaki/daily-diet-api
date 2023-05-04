import fastify, { FastifyReply, FastifyRequest } from 'fastify'

export const app = fastify()

app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send({ hello: 'world' })
})
