import { Schema } from "../schema"
import * as Errors from "../errors"

type ShemaTuple<T extends Array<any>> = { [P in keyof T]: Schema<T[P]> }

export class TupleSchema<T extends Array<any>> extends Schema<T> {
  readonly items: ShemaTuple<T>

  constructor(opts: { items: ShemaTuple<T> }) {
    super()
    this.items = opts.items
  }

  static create<T extends Array<any>>(...items: ShemaTuple<T>): TupleSchema<T> {
    return new TupleSchema({ items })
  }

  json(): { $tuple: Array<any> } {
    return { $tuple: this.items.map((item) => item.json()) }
  }

  validate(data: any): T {
    if (!(data instanceof Array)) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be tuple.",
      })
    }

    for (let i = 0; i < data.length; i++) {
      try {
        this.items[i].validate(data[i])
      } catch (error) {
        if (Errors.InvalidData.guard(error)) {
          error.keys.push(i)
        }
        throw error
      }
    }

    return data as T
  }

  prune(data: any): T {
    return this.validate(data).map((e, i) => this.items[i].prune(e)) as T
  }
}
