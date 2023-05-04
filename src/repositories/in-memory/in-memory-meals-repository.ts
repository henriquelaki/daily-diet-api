import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { MealsRepository } from '../meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async register(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal: Meal = {
      id: randomUUID(),
      name: data.name,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: data.user_id,
      is_part_of_diet: data.is_part_of_diet || false,
    }
    this.items.push(meal)
    return meal
  }
}
