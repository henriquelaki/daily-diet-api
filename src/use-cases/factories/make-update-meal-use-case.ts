import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { UpdateMealUseCase } from '../update-meal'

export function makeUpdateMealUseCase() {
  const repository = new PrismaMealsRepository()
  const useCase = new UpdateMealUseCase(repository)

  return useCase
}
