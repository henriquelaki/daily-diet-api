import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { RetrieveUserMetricsUseCase } from './retrieve-user-metrics'

let repository: InMemoryMealsRepository
let sut: RetrieveUserMetricsUseCase

describe('Retrieve User Metrics Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryMealsRepository()
    sut = new RetrieveUserMetricsUseCase(repository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to retrieve user meals metrics', async () => {
    vi.setSystemTime(new Date('2021-01-01T12:00:00'))
    for (let i = 1; i <= 3; i++) {
      await repository.register({
        name: 'Meal',
        user_id: 'user-id-1',
        meal_datetime: new Date(),
        is_part_of_diet: true,
      })
    }

    vi.setSystemTime(new Date('2021-01-01T13:00:00'))
    await repository.register({
      name: 'Meal',
      user_id: 'user-id-1',
      meal_datetime: new Date(),
      is_part_of_diet: false,
    })

    vi.setSystemTime(new Date('2021-01-03T12:00:00'))
    for (let i = 1; i <= 5; i++) {
      await repository.register({
        name: 'Meal',
        user_id: 'user-id-1',
        meal_datetime: new Date(),
        is_part_of_diet: true,
      })
    }

    vi.setSystemTime(new Date('2021-01-03T13:00:00'))
    await repository.register({
      name: 'Meal',
      user_id: 'user-id-1',
      meal_datetime: new Date(),
      is_part_of_diet: false,
    })

    vi.setSystemTime(new Date('2021-01-02T12:00:00'))
    for (let i = 1; i <= 4; i++) {
      await repository.register({
        name: 'Meal',
        user_id: 'user-id-1',
        meal_datetime: new Date(),
        is_part_of_diet: true,
      })
    }

    vi.setSystemTime(new Date('2021-01-02T13:00:00'))
    await repository.register({
      name: 'Meal',
      user_id: 'user-id-1',
      meal_datetime: new Date(),
      is_part_of_diet: false,
    })

    vi.setSystemTime(new Date('2021-01-04T12:00:00'))
    await repository.register({
      name: 'Meal',
      user_id: 'user-id-1',
      meal_datetime: new Date(),
      is_part_of_diet: true,
    })

    const { metrics } = await sut.execute({
      userId: 'user-id-1',
    })

    console.log(metrics)
    expect(metrics.registeredMealsAmount).toEqual(16)
    expect(metrics.mealsAmountInDiet).toEqual(13)
    expect(metrics.mealsAmountNotInDiet).toEqual(3)
    expect(metrics.bestSequenceOfMealsInDiet).toEqual(5)
  })
})
