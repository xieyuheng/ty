import { createReport } from "../errors/index.js"
import { Schema } from "../schema/index.js"

export class PredicateSchema<T> extends Schema<T> {
  constructor(
    public predicate: (data: any) => data is T,
    public description: string,
  ) {
    super()
  }

  static create<T>(
    predicate: (data: any) => data is T,
    options: {
      description: string
    },
  ): PredicateSchema<T> {
    return new PredicateSchema(predicate, options.description)
  }

  validate(data: any): T {
    if (!this.predicate(data)) {
      throw createReport({
        message: [
          `[PredicateSchema] I expect the data to satisfy the predicate.`,
          ``,
          `  description: ${this.description}`,
        ].join("\n"),
        data,
      })
    }

    return data
  }

  prune(data: any): T {
    return this.validate(data)
  }
}
