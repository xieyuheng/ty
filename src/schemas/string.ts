import { Report } from "../errors"
import { Schema } from "../schema"

export type StringConstraint = (x: string) => boolean

export class StringSchema extends Schema<string> {
  constructor(public constraint?: StringConstraint) {
    super()
  }

  static create(
    options: {
      constraint?: StringConstraint
    } = {},
  ): StringSchema {
    return new StringSchema(options?.constraint)
  }

  validate(data: any): string {
    if (typeof data !== "string") {
      throw new Report(data, {
        message: "I expect the data to be string.",
      })
    }

    if (this.constraint && !this.constraint(data)) {
      throw new Report(data, {
        message: `I expect the string to satisfy the constraint.`,
      })
    }

    return data
  }

  prune(data: any): string {
    return this.validate(data)
  }
}
