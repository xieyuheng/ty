import { createReport } from "../errors"
import { Schema } from "../schema"

export type NumberConstraint = (x: number) => boolean

export class NumberSchema extends Schema<number> {
  constructor(
    public constraint?: NumberConstraint,
    public description?: string,
  ) {
    super()
  }

  static create(
    options: {
      constraint?: NumberConstraint
      description?: string
    } = {},
  ): NumberSchema {
    return new NumberSchema(options?.constraint, options?.description)
  }

  validate(data: any): number {
    if (typeof data !== "number") {
      if (this.description) {
        throw createReport({
          message: [
            `[NumberSchema] I expect the data to be number.`,
            ``,
            `  description: ${this.description}`,
          ].join("\n"),
          data,
        })
      } else {
        throw createReport({
          message: `[NumberSchema] I expect the data to be number.`,
          data,
        })
      }
    }

    if (this.constraint && !this.constraint(data)) {
      if (this.description) {
        throw createReport({
          message: [
            `[NumberSchema] I expect the number to satisfy the constraint.`,
            ``,
            `  description: ${this.description}`,
          ].join("\n"),
          data,
        })
      } else {
        throw createReport({
          message: [
            `[NumberSchema] I expect the number to satisfy the constraint.`,
          ].join("\n"),
          data,
        })
      }
    }

    return data
  }

  prune(data: any): number {
    return this.validate(data)
  }
}
