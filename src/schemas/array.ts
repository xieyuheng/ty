import { Schema } from "../schema"
import * as Errors from "../errors"

export class ArraySchema<T> extends Schema<Array<T>> {
  item: Schema<T>

  constructor(opts: { item: Schema<T> }) {
    super()
    this.item = opts.item
  }

  static create<T>(item: Schema<T>): ArraySchema<T> {
    return new ArraySchema({ item })
  }

  json(): { $array: any } {
    return { $array: this.item.json() }
  }

  validate(data: any): Array<T> {
    if (!(data instanceof Array)) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be array.",
      })
    }

    for (const [i, item] of data.entries()) {
      try {
        this.item.validate(item)
      } catch (error) {
        if (Errors.InvalidData.guard(error)) {
          error.keys.push(i)
        }
        throw error
      }
    }

    return data
  }

  prune(data: any): Array<T> {
    return this.validate(data).map((e) => this.item.prune(e))
  }
}
