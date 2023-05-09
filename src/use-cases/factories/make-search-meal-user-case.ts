import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetMealUseCase } from '../search-meal'

export function makeSearchMealUseCase() {
  const repository = new PrismaMealsRepository()
  const useCase = new GetMealUseCase(repository)

  return useCase
}
