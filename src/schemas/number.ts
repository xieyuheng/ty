import { ValidationReport } from "../errors"
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
      throw new ValidationReport(data, {
        message: "I expect the data to be number.",
      })
    }

    if (this.constraint && !this.constraint(data)) {
      throw new ValidationReport(data, {
        message: `I expect the number to satisfy the constraint.`,
      })
    }

    return data
  }

  prune(data: any): number {
    return this.validate(data)
  }
}
