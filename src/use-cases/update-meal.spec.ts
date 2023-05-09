import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateMealUseCase } from './update-meal'

let repository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Update a meal Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(repository)
  })

  it('Should be able to update a meal', async () => {
    const mealDate = new Date()
    const createdMeal = await repository.register({
      name: 'Test meal',
      user_id: 'user-id',
      meal_datetime: mealDate,
    })

    expect(createdMeal.is_part_of_diet).toEqual(false)
    expect(createdMeal.name).toEqual('Test meal')
    expect(createdMeal.meal_datetime).toEqual(mealDate)

    const updatedMealDate = new Date()
    const mealUpdatedData = {
      name: 'Test meal updated',
      is_part_of_diet: true,
      meal_datetime: updatedMealDate,
    }

    const { meal } = await sut.execute({
      mealId: createdMeal.id,
      userId: 'user-id',
      data: mealUpdatedData,
    })

    expect(meal.id).toEqual(createdMeal.id)
    expect(meal.name).toEqual('Test meal updated')
    expect(meal.is_part_of_diet).toEqual(true)
    expect(meal.meal_datetime).toEqual(updatedMealDate)
  })
})
