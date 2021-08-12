import { Schema } from "../schema"
import * as Errors from "../errors"

export class DictSchema<T> extends Schema<Record<string, T>> {
  item: Schema<T>

  constructor(opts: { item: Schema<T> }) {
    super()
    this.item = opts.item
  }

  static create<T>(item: Schema<T>): DictSchema<T> {
    return new DictSchema({ item })
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
        if (error instanceof Errors.InvalidData) {
          error.keys.push(key)
        }
        throw error
      }
    }

    return data
  }
}
