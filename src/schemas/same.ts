import { Schema } from "../schema"
import * as Errors from "../errors"
import * as ut from "../ut"

export class SameSchema<T> extends Schema<T> {
  data: T

  constructor(data: T) {
    super()
    this.data = data
  }

  static create<T>(data: T): SameSchema<T> {
    return new SameSchema(data)
  }

  validate(data: any): T {
    if (!ut.equal(this.data, data)) {
      const repr = JSON.stringify(data)
      throw new Errors.InvalidData(data, {
        msg: `I expect the data to be the same as data: ${repr}`,
      })
    }

    return data
  }
}
