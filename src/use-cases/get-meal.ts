import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface GetMealUseCaseRequest {
  mealId: string
}

interface GetMealUseCaseResponse {
  meal: Meal | null
}

export class GetMealUseCase {
  constructor(private repository: MealsRepository) {}

  async execute({
    mealId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const meal = await this.repository.findById(mealId)
    return { meal }
  }
}
