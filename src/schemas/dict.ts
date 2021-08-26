import { Schema } from "../schema"
import * as Errors from "../errors"
import ty from ".."

export class DictSchema<T> extends Schema<Record<string, T>> {
  item: Schema<T>

  constructor(opts: { item: Schema<T> }) {
    super()
    this.item = opts.item
  }

  static create<T>(item: Schema<T>): DictSchema<T> {
    return new DictSchema({ item })
  }

  json(): { $dict: any } {
    return { $dict: this.item.json() }
  }

  validate(data: any): Record<string, T> {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be dict.",
      })
    }

    for (const [key, item] of Object.entries(data)) {
      try {
        this.item.validate(item)
      } catch (error) {
        if (Errors.InvalidData.guard(error)) {
          error.keys.push(key)
        }
        throw error
      }
    }

    return data
  }

  prune(data: any): Record<string, T> {
    const typedData = this.validate(data)
    const record: Record<string, T> = {}
    for (const key in typedData) {
      record[key] = this.item.prune(typedData[key])
    }

    return record
  }

  generate(): Record<string, T> {
    const length = ty.number({ gte: 0 }).generate()
    const results: Record<string, T> = {}
    for (let i = 0; i < length; i++) {
      const key = ty.string().generate()
      results[key] = this.item.generate()
    }

    return results
  }
}
