import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterMealUserUseCase } from './register-meal'

let repository: InMemoryMealsRepository
let sut: RegisterMealUserUseCase

describe('Register a meal User Case', () => {
  beforeEach(() => {
    repository = new InMemoryMealsRepository()
    sut = new RegisterMealUserUseCase(repository)
  })

  it('Should be able to register a meal', async () => {
    const { meal } = await sut.execute({
      name: 'Test meal',
      userId: 'user-id',
      isPartOfDiet: true,
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal.name).toEqual('Test meal')
    expect(meal.is_part_of_diet).toEqual(true)
  })
})
