import { Schema } from "../schema"
import * as Errors from "../errors"

export class NullSchema extends Schema<null> {
  static create(): NullSchema {
    return new NullSchema()
  }

  validate(data: any): null {
    if (data !== null) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be null.",
      })
    }

    return data
  }
}
