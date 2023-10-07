import { createReport } from "../errors"
import { Schema } from "../schema"

export type NumberConstraint = (x: number) => boolean

export class NumberSchema extends Schema<number> {
  constructor(public constraint?: NumberConstraint) {
    super()
  }

  static create(
    options: {
      constraint?: NumberConstraint
    } = {},
  ): NumberSchema {
    return new NumberSchema(options?.constraint)
  }

  validate(data: any): number {
    if (typeof data !== "number") {
      throw createReport({
        message: `[NumberSchema] I expect the data to be number.`,
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
