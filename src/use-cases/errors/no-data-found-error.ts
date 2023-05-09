export class NoDataFoundError extends Error {
  constructor() {
    super('No Data Found.')
    this.name = 'NoDataFoundError'
  }
}
