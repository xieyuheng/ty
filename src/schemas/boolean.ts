import { createReport } from "../errors/index.js"
import { Schema } from "../schema/index.js"

export class BooleanSchema extends Schema<boolean> {
  static create(): BooleanSchema {
    return new BooleanSchema()
  }

  validate(data: any): boolean {
    if (typeof data !== "boolean") {
      throw createReport({
        message: `[BooleanSchema] I expect the data to be boolean.`,
        data,
      })
    }

    return data
  }

  prune(data: any): boolean {
    return this.validate(data)
  }
}
