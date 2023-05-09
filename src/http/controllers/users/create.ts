import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createBodySchema.parse(request.body)

  const createUserUseCase = makeCreateUserUseCase()
  await createUserUseCase.execute({ name, email, password })

  return reply.code(201).send()
}
