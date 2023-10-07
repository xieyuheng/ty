import { createReport } from "../errors"
import { Json } from "../json"
import { jsonEqual } from "../json/jsonEqual"
import { Schema } from "../schema"
import { indent } from "../utils/indent"

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
      throw createReport({
        message: [
          `[ConstSchema] I expect the data to be a const.`,
          ``,
          `  const data: ${indent(JSON.stringify(data, null, 2))}`,
        ].join("\n"),
        data,
      })
    }

    return data
  }

  prune(data: any): T {
    return this.validate(data)
  }
}
