import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(mealId: string, userId: string): Promise<Meal | null>
  findByUserId(userId: string): Promise<Meal[]>
  register(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  update(
    mealId: string,
    userId: string,
    data: Prisma.MealUpdateWithoutUserInput,
  ): Promise<Meal>
  delete(mealId: string): Promise<void>
}
