import { Schema } from "../schema"
import * as Errors from "../errors"

export class StringSchema extends Schema<string> {
  static create(): StringSchema {
    return new StringSchema()
  }

  check(data: any): string {
    if (typeof data !== "string") {
      throw new Errors.InvalidData(data, {
        msg: "I am expecting the data to be a string.",
      })
    }

    return data
  }
}
