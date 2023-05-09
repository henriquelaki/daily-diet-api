import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
import { NoDataFoundError } from './errors/no-data-found-error'

interface GetMealUseCaseRequest {
  mealId: string
  userId: string
}

interface GetMealUseCaseResponse {
  meal: Meal | null
}

export class GetMealUseCase {
  constructor(private repository: MealsRepository) {}

  // TODO: allow only its owner to get a meal detail

  async execute({
    mealId,
    userId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const meal = await this.repository.findById(mealId, userId)

    if (!meal) {
      throw new NoDataFoundError()
    }
    return { meal }
  }
}
