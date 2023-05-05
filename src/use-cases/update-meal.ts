import { MealsRepository } from '@/repositories/meals-repository'
import { Meal, Prisma } from '@prisma/client'

interface UpdateMealUseCaseRequest {
  mealId: string
  data: Prisma.MealUpdateWithoutUserInput
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private repository: MealsRepository) {}

  async execute({
    mealId,
    data,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.repository.update(mealId, data)
    return { meal }
  }
}
