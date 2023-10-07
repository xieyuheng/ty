import { createReport } from "../errors"
import { Schema } from "../schema"

export class NullSchema extends Schema<null> {
  static create(): NullSchema {
    return new NullSchema()
  }

  validate(data: any): null {
    if (data !== null) {
      throw createReport({
        message: `[NullSchema] I expect the data to be null.`,
        data,
      })
    }

    return data
  }

  prune(data: any): null {
    return this.validate(data)
  }
}
