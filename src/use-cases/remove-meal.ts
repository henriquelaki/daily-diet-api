import { MealsRepository } from '@/repositories/meals-repository'

interface DeleteMealUseCaseRequest {
  mealId: string
}

export class DeleteMealUseCase {
  constructor(private repository: MealsRepository) {}

  // TODO: allow only its owner to delete a meal

  async execute({ mealId }: DeleteMealUseCaseRequest): Promise<void> {
    await this.repository.delete(mealId)
  }
}
