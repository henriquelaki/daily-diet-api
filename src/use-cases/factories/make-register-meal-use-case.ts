import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { RegisterMealUserUseCase } from '../register-meal'

export function makeRegisterMealUseCase() {
  const repository = new PrismaMealsRepository()
  const useCase = new RegisterMealUserUseCase(repository)

  return useCase
}
