import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface FetchMealsByUserUseCaseRequest {
  userId: string
}

interface FetchMealsByUserUseCaseResponse {
  meals: Meal[]
}

export class FetchMealsByUserUseCase {
  constructor(private repository: MealsRepository) {}

  async execute({
    userId,
  }: FetchMealsByUserUseCaseRequest): Promise<FetchMealsByUserUseCaseResponse> {
    const meals = await this.repository.findByUserId(userId)
    return { meals }
  }
}
