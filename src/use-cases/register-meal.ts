import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface RegisterMealUseCaseRequest {
  name: string
  userId: string
  isPartOfDiet?: boolean
}

interface RegisterMealUseCaseResponse {
  meal: Meal
}

export class RegisterMealUserUseCase {
  constructor(private repository: MealsRepository) {}

  async execute({
    name,
    userId,
    isPartOfDiet = false,
  }: RegisterMealUseCaseRequest): Promise<RegisterMealUseCaseResponse> {
    const newMeal = {
      name,
      user_id: userId,
      is_part_of_diet: isPartOfDiet,
    }
    const meal = await this.repository.register(newMeal)
    return { meal }
  }
}
