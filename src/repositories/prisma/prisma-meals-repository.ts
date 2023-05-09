import { prisma } from '@/lib/prisma'
import { NoDataFoundError } from '@/use-cases/errors/no-data-found-error'
import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(mealId: string, userId: string) {
    const meal = await prisma.meal.findFirstOrThrow({
      where: {
        id: mealId,
        user_id: userId,
      },
    })

    return meal || null
  }

  async findByUserId(userId: string) {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
      },
    })

    return meals
  }

  async register(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({ data })

    return meal
  }

  async update(
    mealId: string,
    userId: string,
    data: Prisma.MealUpdateWithoutUserInput,
  ): Promise<Meal> {
    const userHasThisMeal = await prisma.meal.findFirst({
      where: {
        id: mealId,
        user_id: userId,
      },
    })

    console.log(userHasThisMeal)

    if (!userHasThisMeal) {
      throw new NoDataFoundError()
    }

    const updatedMeal = await prisma.meal.update({
      where: {
        id: mealId,
      },
      data,
    })

    return updatedMeal
  }

  async delete(mealId: string) {
    await prisma.meal.delete({
      where: {
        id: mealId,
      },
    })
  }
}
