import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user'

let repository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(repository)
  })

  it('Should be able to create a gyn', async () => {
    const { user } = await sut.execute({ name: 'Test User' })

    expect(user.getId()).toEqual(expect.any(String))
    expect(user.getName()).toEqual('Test User')
  })
})
