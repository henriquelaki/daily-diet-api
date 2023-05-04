import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  register(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
}
