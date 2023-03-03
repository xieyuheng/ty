import * as Errors from "../errors"
import { Schema } from "../schema"
import { equal } from "../utils/equal"

export class ConstSchema<T> extends Schema<T> {
  data: T

  constructor(data: T) {
    super()
    this.data = data
  }

  static create<T>(data: T): ConstSchema<T> {
    return new ConstSchema(data)
  }

  json(): { $const: any } {
    return { $const: this.data }
  }

  validate(data: any): T {
    if (!equal(this.data, data)) {
      const repr = JSON.stringify(data)
      throw new Errors.InvalidData(data, {
        msg: `I expect the data to be a const data: ${repr}`,
      })
    }

    return data
  }

  prune(data: any): T {
    return this.validate(data)
  }

  generate(): T {
    return this.data
  }
}
