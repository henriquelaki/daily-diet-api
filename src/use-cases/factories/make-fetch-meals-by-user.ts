import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { FetchMealsByUserUseCase } from '../fetch-meals-by-user'

export function makeFetchMealsByUser() {
  const repository = new PrismaMealsRepository()
  const useCase = new FetchMealsByUserUseCase(repository)

  return useCase
}
