import { MealsRepository } from '@/repositories/meals-repository'
import { Meal, Prisma } from '@prisma/client'

interface UpdateMealUseCaseRequest {
  mealId: string
  data: {
    name?: string
    mealDateTime?: Date
    isPartOfDiet?: boolean
  }
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private repository: MealsRepository) {}

  // TODO: allow only its owner to update a meal
  async execute({
    mealId,
    data,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const dataToUpdate = {
      name: data.name,
      meal_datetime: data.mealDateTime,
      is_part_of_diet: data.isPartOfDiet,
    } as Prisma.MealUpdateInput

    const meal = await this.repository.update(mealId, dataToUpdate)
    return { meal }
  }
}
