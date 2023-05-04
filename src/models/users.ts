import { randomUUID } from 'crypto'

export class User {
  constructor(private name: string) {}
  private id: string = randomUUID()
  public getName(): string {
    return this.name
  }

  public getId(): string {
    return this.id
  }
}
