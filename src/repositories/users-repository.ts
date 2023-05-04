import { User } from '@/models/users'

export interface UsersRepository {
  create(data: User): Promise<User>
}
