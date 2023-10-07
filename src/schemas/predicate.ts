import { createReport } from "../errors"
import { Schema } from "../schema"

export class PredicateSchema<T> extends Schema<T> {
  predicate: (data: any) => data is T

  constructor(predicate: (data: any) => data is T) {
    super()
    this.predicate = predicate
  }

  static create<T>(predicate: (data: any) => data is T): PredicateSchema<T> {
    return new PredicateSchema(predicate)
  }

  validate(data: any): T {
    if (!this.predicate(data)) {
      throw createReport({
        message: `[PredicateSchema] I expect the data to satisfy the predicate: ${this.predicate}`,
        data,
      })
    }

    return data
  }

  prune(data: any): T {
    return this.validate(data)
  }
}
