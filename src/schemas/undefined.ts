import { createReport } from "../errors"
import { Schema } from "../schema"

export class UndefinedSchema extends Schema<undefined> {
  static create(): UndefinedSchema {
    return new UndefinedSchema()
  }

  validate(data: any): undefined {
    if (data !== undefined) {
      throw createReport({
        message: `[UndefinedSchema] I expect the data to be undefined.`,
        data,
      })
    }

    return data
  }

  prune(data: any): undefined {
    return this.validate(data)
  }
}
