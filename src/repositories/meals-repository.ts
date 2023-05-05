import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(mealId: string): Promise<Meal | null>
  findByUserId(userId: string): Promise<Meal[]>
  register(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  update(mealId: string, data: Prisma.MealUpdateWithoutUserInput): Promise<Meal>
  delete(mealId: string): Promise<void>
}
