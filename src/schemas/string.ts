import { createReport } from "../errors"
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
      throw createReport({
        message: `[StringSchema] I expect the data to be string.`,
        data,
      })
    }

    if (this.constraint && !this.constraint(data)) {
      throw createReport({
        message: `[StringSchema] I expect the string to satisfy the constraint.`,
        data,
      })
    }

    return data
  }

  prune(data: any): string {
    return this.validate(data)
  }
}
