import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetMealUseCase } from './search-meal'

let repository: InMemoryMealsRepository
let sut: GetMealUseCase

describe('Fetch meals by User Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryMealsRepository()
    sut = new GetMealUseCase(repository)
  })

  it('Should be able to get a meal by its id', async () => {
    const mealToBeGot = await repository.register({
      name: 'Meal to be get 1',
      user_id: 'user-id-1',
    })

    const { meal } = await sut.execute({
      mealId: mealToBeGot.id,
    })

    expect(meal).toEqual(
      expect.objectContaining({
        id: mealToBeGot.id,
        name: 'Meal to be get 1',
        user_id: 'user-id-1',
      }),
    )
  })

  it('Should not be able to get a meal by its id if it does not exist', async () => {
    const { meal } = await sut.execute({
      mealId: 'non-existing-meal-id',
    })

    expect(meal).toBeFalsy()
  })
})
