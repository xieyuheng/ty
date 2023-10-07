import { createReport } from "../errors"
import { Schema } from "../schema"

export class PredicateSchema<T> extends Schema<T> {
  constructor(
    public predicate: (data: any) => data is T,
    public message?: string,
  ) {
    super()
  }

  static create<T>(
    predicate: (data: any) => data is T,
    options?: {
      message?: string
    },
  ): PredicateSchema<T> {
    return new PredicateSchema(predicate, options?.message)
  }

  validate(data: any): T {
    if (!this.predicate(data)) {
      if (this.message) {
        throw createReport({
          message: [
            `[PredicateSchema] I expect the data to satisfy the predicate.`,
            ``,
            `  predicate: ${this.message}`,
          ].join("\n"),
          data,
        })
      } else {
        throw createReport({
          message: [
            `[PredicateSchema] I expect the data to satisfy the predicate.`,
            ``,
            `  predicate: ${this.predicate}`,
          ].join("\n"),
          data,
        })
      }
    }

    return data
  }

  prune(data: any): T {
    return this.validate(data)
  }
}
