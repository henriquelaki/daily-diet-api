import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
import { NoDataFoundError } from './errors/no-data-found-error'

interface GetMealUseCaseRequest {
  mealId: string
}

interface GetMealUseCaseResponse {
  meal: Meal | null
}

export class GetMealUseCase {
  constructor(private repository: MealsRepository) {}

  // TODO: allow only its owner to get a meal detail

  async execute({
    mealId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const meal = await this.repository.findById(mealId)

    if (!meal) {
      throw new NoDataFoundError()
    }
    return { meal }
  }
}
