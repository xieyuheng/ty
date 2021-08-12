import { Schema } from "../schema"
import * as Errors from "../errors"

export class UndefinedSchema extends Schema<undefined> {
  static create(): UndefinedSchema {
    return new UndefinedSchema()
  }

  validate(data: any): undefined {
    if (data !== undefined) {
      throw new Errors.InvalidData(data, {
        msg: "I am expecting the data to be undefined.",
      })
    }

    return data
  }
}
