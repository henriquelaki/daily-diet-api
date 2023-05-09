import { makeSearchMealUseCase } from '@/use-cases/factories/make-search-meal-user-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchParamsSchema = z.object({
    mealId: z.string(),
  })

  const { mealId } = searchParamsSchema.parse(request.params)

  const searchMealUseCase = makeSearchMealUseCase()
  const { meal } = await searchMealUseCase.execute({
    mealId,
  })

  return reply.code(200).send({ meal })
}
