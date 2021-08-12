import { Schema } from "../schema"
import * as Errors from "../errors"

export class NullSchema extends Schema<null> {
  static create(): NullSchema {
    return new NullSchema()
  }

  validate(data: any): null {
    if (data !== null) {
      throw new Errors.InvalidData(data, {
        msg: "I am expecting the data to be a null.",
      })
    }

    return data
  }
}
