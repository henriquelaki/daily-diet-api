import { makeFetchMealsByUser } from '@/use-cases/factories/make-fetch-meals-by-user'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const fetchMealsByUserUseCase = makeFetchMealsByUser()
  const { meals } = await fetchMealsByUserUseCase.execute({
    userId,
  })

  return reply.code(200).send({ meals })
}
