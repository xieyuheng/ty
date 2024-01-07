import { createReport } from "../errors/index.js"
import { type Json } from "../json/index.js"
import { jsonEqual } from "../json/jsonEqual.js"
import { Schema } from "../schema/index.js"
import { indent } from "../utils/indent.js"

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
          `  const data:`,
          indent(JSON.stringify(data, null, 4), "    "),
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
