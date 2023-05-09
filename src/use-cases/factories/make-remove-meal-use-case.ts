import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { DeleteMealUseCase } from '../remove-meal'

export function makeRemoveMealUseCase() {
  const repository = new PrismaMealsRepository()
  const useCase = new DeleteMealUseCase(repository)

  return useCase
}
