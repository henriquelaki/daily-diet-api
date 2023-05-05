import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { MealsRepository } from '../meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findById(mealId: string): Promise<Meal | null> {
    const meal = this.items.find((item) => item.id === mealId)
    return meal || null
  }

  async register(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal: Meal = {
      id: randomUUID(),
      name: data.name,
      meal_datetime: data.meal_datetime
        ? new Date(data.meal_datetime)
        : new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      user_id: data.user_id,
      is_part_of_diet: data.is_part_of_diet || false,
    }
    this.items.push(meal)
    return meal
  }

  async update(
    mealId: string,
    data: Prisma.MealUpdateWithoutUserInput,
  ): Promise<Meal> {
    const mealIndex = this.items.findIndex((item) => item.id === mealId)
    if (mealIndex >= 0) {
      const oldMealData = this.items[mealIndex]
      const newMealData = { ...oldMealData, ...data, id: mealId } as Meal
      this.items[mealIndex] = newMealData
    }

    return this.items[mealIndex]
  }

  async delete(mealId: string): Promise<void> {
    const mealIndex = this.items.findIndex((item) => item.id === mealId)
    if (mealIndex >= 0) {
      this.items.splice(mealIndex, 1)
    }
  }
}
