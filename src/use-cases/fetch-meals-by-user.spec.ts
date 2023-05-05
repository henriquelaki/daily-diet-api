import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchMealsByUserUseCase } from './fetch-meals-by-user'

let repository: InMemoryMealsRepository
let sut: FetchMealsByUserUseCase

describe('Fetch meals by User Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryMealsRepository()
    sut = new FetchMealsByUserUseCase(repository)
  })

  it('Should be able to list meals by user', async () => {
    await repository.register({
      name: 'Meal to be listed 1',
      user_id: 'user-id-1',
      meal_datetime: new Date(),
    })

    await repository.register({
      name: 'Meal to be listed 2',
      user_id: 'user-id-1',
      meal_datetime: new Date(),
    })

    await repository.register({
      name: 'Meal to not be listed',
      user_id: 'user-id-2',
      meal_datetime: new Date(),
    })

    const { meals } = await sut.execute({
      userId: 'user-id-1',
    })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Meal to be listed 1',
        }),
        expect.objectContaining({
          name: 'Meal to be listed 2',
        }),
      ]),
    )
  })
})
