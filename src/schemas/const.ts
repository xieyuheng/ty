import { ValidationReport } from "../errors"
import { Json } from "../json"
import { jsonEqual } from "../json/jsonEqual"
import { Schema } from "../schema"

export class ConstSchema<T> extends Schema<T> {
  data: T

  constructor(data: T) {
    super()
    this.data = data
  }

  static create<T>(data: T): ConstSchema<T> {
    return new ConstSchema(data)
  }

  validate(data: any): T {
    if (!jsonEqual(this.data as Json, data)) {
      const repr = JSON.stringify(data)
      throw new ValidationReport(data, {
        msg: `I expect the data to be a const data: ${repr}`,
      })
    }

    return data
  }

  prune(data: any): T {
    return this.validate(data)
  }
}
