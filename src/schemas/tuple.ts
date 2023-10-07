import { appendReport, createReport } from "../errors"
import { Schema } from "../schema"

type SchemaTuple<T extends Array<any>> = { [P in keyof T]: Schema<T[P]> }

export class TupleSchema<T extends Array<any>> extends Schema<T> {
  readonly items: SchemaTuple<T>

  constructor(options: { items: SchemaTuple<T> }) {
    super()
    this.items = options.items
  }

  static create<T extends Array<any>>(
    ...items: SchemaTuple<T>
  ): TupleSchema<T> {
    return new TupleSchema({ items })
  }

  validate(data: any): T {
    if (!(data instanceof Array)) {
      throw createReport({
        message: `[TupleSchema] I expect the data to be tuple.`,
        data,
      })
    }

    for (let i = 0; i < data.length; i++) {
      try {
        this.items[i].validate(data[i])
      } catch (error) {
        throw appendReport(error, {
          message: `[TupleSchema] I fail on index: ${i}.`,
          data,
        })
      }
    }

    return data as T
  }

  prune(data: any): T {
    return this.validate(data).map((e, i) => this.items[i].prune(e)) as T
  }
}
