import { createReport } from "../errors/index.js"
import { Schema } from "../schema/index.js"

export type StringConstraint = (x: string) => boolean

export type StringOptions = {
  constraint?: StringConstraint
  description?: string
}

export class StringSchema extends Schema<string> {
  constructor(
    public constraint?: StringConstraint,
    public description?: string,
  ) {
    super()
  }

  static create(options: StringOptions = {}): StringSchema {
    return new StringSchema(options?.constraint, options?.description)
  }

  validate(data: any): string {
    if (typeof data !== "string") {
      if (this.description) {
        throw createReport({
          message: [
            `[StringSchema] I expect the data to be string.`,
            ``,
            `  description: ${this.description}`,
          ].join("\n"),
          data,
        })
      } else {
        throw createReport({
          message: `[StringSchema] I expect the data to be string.`,
          data,
        })
      }
    }

    if (this.constraint && !this.constraint(data)) {
      if (this.description) {
        throw createReport({
          message: [
            `[StringSchema] I expect the string to satisfy the constraint.`,
            ``,
            `  description: ${this.description}`,
          ].join("\n"),
          data,
        })
      } else {
        throw createReport({
          message: `[StringSchema] I expect the string to satisfy the constraint.`,
          data,
        })
      }
    }

    return data
  }

  prune(data: any): string {
    return this.validate(data)
  }
}
