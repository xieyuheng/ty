import { Report } from "../errors"
import { Schema } from "../schema"

export class UndefinedSchema extends Schema<undefined> {
  static create(): UndefinedSchema {
    return new UndefinedSchema()
  }

  validate(data: any): undefined {
    if (data !== undefined) {
      throw new Report(data, {
        message: "I expect the data to be undefined.",
      })
    }

    return data
  }

  prune(data: any): undefined {
    return this.validate(data)
  }
}
