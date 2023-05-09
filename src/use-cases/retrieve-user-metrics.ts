import { UserMetrics } from '@/@types/types'
import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface RetrieveUserMetricsUseCaseRequest {
  userId: string
}

interface RetrieveUserMetricsUseCaseResponse {
  metrics: UserMetrics
}

export class RetrieveUserMetricsUseCase {
  constructor(private repository: MealsRepository) {}

  async execute({
    userId,
  }: RetrieveUserMetricsUseCaseRequest): Promise<RetrieveUserMetricsUseCaseResponse> {
    const meals = await this.repository.findByUserId(userId)

    const registeredMealsAmount = meals.length

    const mealsAmountInDiet = meals.filter(
      (meal) => meal.is_part_of_diet,
    ).length

    const mealsAmountNotInDiet = registeredMealsAmount - mealsAmountInDiet

    const bestSequenceOfMealsInDiet =
      this.getBestSequenceOfMealsInDietAmount(meals)

    const metrics = {
      registeredMealsAmount,
      mealsAmountInDiet,
      mealsAmountNotInDiet,
      bestSequenceOfMealsInDiet,
    } as UserMetrics

    return { metrics }
  }

  private getBestSequenceOfMealsInDietAmount(meals: Meal[]): number {
    let bestSequenceOfMealsInDiet = 0
    let currentSequenceOfMealsInDiet = 0

    const orderedMealsByDate = meals.sort((a, b) => {
      return a.meal_datetime.getTime() - b.meal_datetime.getTime()
    })

    orderedMealsByDate.forEach((meal) => {
      if (meal.is_part_of_diet) {
        currentSequenceOfMealsInDiet++
      } else {
        if (currentSequenceOfMealsInDiet > bestSequenceOfMealsInDiet) {
          bestSequenceOfMealsInDiet = currentSequenceOfMealsInDiet
        }
        currentSequenceOfMealsInDiet = 0
      }
    })

    if (currentSequenceOfMealsInDiet > bestSequenceOfMealsInDiet) {
      bestSequenceOfMealsInDiet = currentSequenceOfMealsInDiet
    }

    return bestSequenceOfMealsInDiet
  }
}
