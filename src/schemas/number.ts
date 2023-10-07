import { createReport } from "../errors"
import { Schema } from "../schema"

export type NumberConstraint = (x: number) => boolean

export class NumberSchema extends Schema<number> {
  constructor(
    public constraint?: NumberConstraint,
    public message?: string,
  ) {
    super()
  }

  static create(
    options: {
      constraint?: NumberConstraint
      message?: string
    } = {},
  ): NumberSchema {
    return new NumberSchema(options?.constraint, options?.message)
  }

  validate(data: any): number {
    if (typeof data !== "number") {
      throw createReport({
        message: [
          `[NumberSchema] I expect the data to be number.`,
          ``,
          `  constraint: ${this.message || this.constraint}`,
        ].join("\n"),
        data,
      })
    }

    if (this.constraint && !this.constraint(data)) {
      throw createReport({
        message: `[NumberSchema] I expect the number to satisfy the constraint.`,
        data,
      })
    }

    return data
  }

  prune(data: any): number {
    return this.validate(data)
  }
}
