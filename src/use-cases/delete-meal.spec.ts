import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteMealUseCase } from './delete-meal'

let repository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('Register a meal Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(repository)
  })

  it('Should be able to delete a meal', async () => {
    const mealDate = new Date()
    const createdMeal = await repository.register({
      name: 'Test meal',
      user_id: 'user-id',
      meal_datetime: mealDate,
    })

    expect(createdMeal.is_part_of_diet).toEqual(false)
    expect(createdMeal.name).toEqual('Test meal')
    expect(createdMeal.meal_datetime).toEqual(mealDate)

    await sut.execute({
      mealId: createdMeal.id,
    })

    const deletedMealIndex = repository.items.findIndex(
      (item) => item.id === createdMeal.id,
    )

    expect(deletedMealIndex).toBeLessThan(0)
  })
})
