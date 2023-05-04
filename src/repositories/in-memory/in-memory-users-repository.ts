import { User } from '@/models/users'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: User): Promise<User> {
    this.items.push(data)
    return data
  }
}
