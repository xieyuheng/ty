import { Schema } from "../schema"
import * as Errors from "../errors"

export class NumberSchema extends Schema<number> {
  static create(): NumberSchema {
    return new NumberSchema()
  }

  check(data: any): number {
    if (typeof data !== "number") {
      throw new Errors.InvalidData(data, {
        msg: "I am expecting the data to be a number.",
      })
    }

    return data
  }
}
