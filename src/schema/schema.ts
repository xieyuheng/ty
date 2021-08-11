export abstract class Schema<T> {
  instanceofSchema = true

  abstract check(data: any): T
}
