import * as Errors from "../errors"
import { Schema } from "../schema"

export class NullSchema extends Schema<null> {
  static create(): NullSchema {
    return new NullSchema()
  }

  json(): "null" {
    return "null"
  }

  validate(data: any): null {
    if (data !== null) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be null.",
      })
    }

    return data
  }

  prune(data: any): null {
    return this.validate(data)
  }

  generate(): null {
    return null
  }
}
