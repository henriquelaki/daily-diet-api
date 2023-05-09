import { prisma } from '@/lib/prisma'
import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(mealId: string) {
    const meal = await prisma.meal.findUnique({
      where: {
        id: mealId,
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
    data: Prisma.MealUpdateWithoutUserInput,
  ): Promise<Meal> {
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
