import { makeRemoveMealUseCase } from '@/use-cases/factories/make-remove-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
    mealId: z.string(),
  })

  const { mealId } = updateParamsSchema.parse(request.params)

  const deleteMealUseCase = makeRemoveMealUseCase()
  await deleteMealUseCase.execute({
    mealId,
  })

  return reply.code(200).send()
}
