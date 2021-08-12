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
        if (error instanceof Errors.InvalidData) {
          error.keys.push(i)
        }
        throw error
      }
    }

    return data
  }
}
