import { Schema } from "../schema"
import * as Errors from "../errors"

export class BooleanSchema extends Schema<boolean> {
  static create(): BooleanSchema {
    return new BooleanSchema()
  }

  validate(data: any): boolean {
    if (typeof data !== "boolean") {
      throw new Errors.InvalidData(data, {
        msg: "I am expecting the data to be boolean.",
      })
    }

    return data
  }
}
