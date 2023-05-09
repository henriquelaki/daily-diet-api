import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
    mealId: z.string(),
  })

  const updateBodySchema = z.object({
    name: z.string().optional(),
    mealDateTime: z.coerce.date().optional(),
    isPartOfDiet: z.coerce.boolean().optional(),
  })

  const { mealId } = updateParamsSchema.parse(request.params)

  const { name, mealDateTime, isPartOfDiet } = updateBodySchema.parse(
    request.body,
  )

  const dataToUpdate = {
    name,
    mealDateTime,
    isPartOfDiet,
  }

  const updateMealUseCase = makeUpdateMealUseCase()
  const updatedMeal = await updateMealUseCase.execute({
    mealId,
    data: dataToUpdate,
  })

  return reply.code(200).send({ meal: updatedMeal })
}
