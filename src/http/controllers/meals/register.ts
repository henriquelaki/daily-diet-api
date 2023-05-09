import { makeRegisterMealUseCase } from '@/use-cases/factories/make-register-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    mealDateTime: z.coerce.date().optional(),
    isPartOfDiet: z.coerce.boolean().optional(),
  })

  const { name, mealDateTime, isPartOfDiet } = registerBodySchema.parse(
    request.body,
  )

  const registerMealUseCase = makeRegisterMealUseCase()
  await registerMealUseCase.execute({
    name,
    userId: request.user.sub,
    mealDateTime,
    isPartOfDiet,
  })

  return reply.code(201).send()
}
