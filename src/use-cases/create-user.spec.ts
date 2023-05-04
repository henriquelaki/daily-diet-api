import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user'

let repository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(repository)
  })

  it('Should be able to create a user', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'Test User',
      email: 'test.user@mail.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    )

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Test User')
    expect(user.email).toEqual('test.user@mail.com')
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
