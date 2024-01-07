import { appendReport, createReport } from "../errors/index.js"
import { isJsonObject } from "../json/index.js"
import { Schema } from "../schema/index.js"

export class DictSchema<T> extends Schema<Record<string, T>> {
  constructor(public item: Schema<T>) {
    super()
  }

  static create<T>(item: Schema<T>): DictSchema<T> {
    return new DictSchema(item)
  }

  validate(data: any): Record<string, T> {
    if (!isJsonObject(data)) {
      throw createReport({
        message: `[DictSchema] I expect the data to be dict (record with string keys).`,
        data,
      })
    }

    for (const [key, item] of Object.entries(data)) {
      try {
        this.item.validate(item)
      } catch (error) {
        throw appendReport(error, {
          message: `[DictSchema] I fail to validate key: ${key}.`,
          data,
        })
      }
    }

    return data as Record<string, T>
  }

  prune(data: any): Record<string, T> {
    const typedData = this.validate(data)
    const record: Record<string, T> = {}
    for (const key in typedData) {
      record[key] = this.item.prune(typedData[key])
    }

    return record
  }
}
