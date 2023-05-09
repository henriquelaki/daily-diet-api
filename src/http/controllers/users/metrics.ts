import { makeRetrieveUserMetricsUseCase } from '@/use-cases/factories/make-retrieve-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const fetchMealsByUserUseCase = makeRetrieveUserMetricsUseCase()
  const { metrics } = await fetchMealsByUserUseCase.execute({
    userId,
  })

  return reply.code(200).send({ metrics })
}
