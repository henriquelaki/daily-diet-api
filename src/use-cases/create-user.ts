import { User } from '@/models/users'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const user = new User(name)
    await this.usersRepository.create(user)
    return { user }
  }
}
