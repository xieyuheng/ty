import { appendReport, createReport } from "../errors"
import { Schema } from "../schema"

export class ArraySchema<T> extends Schema<Array<T>> {
  constructor(public item: Schema<T>) {
    super()
  }

  static create<T>(item: Schema<T>): ArraySchema<T> {
    return new ArraySchema(item)
  }

  validate(data: any): Array<T> {
    if (!(data instanceof Array)) {
      throw createReport({
        message: `[ArraySchema] I expect the data to be array.`,
        data,
      })
    }

    for (const [i, item] of data.entries()) {
      try {
        this.item.validate(item)
      } catch (error) {
        throw appendReport(error, {
          message: [
            `[ArraySchema] I find invalid element in array.`,
            ``,
            `  index: ${i}`,
          ].join("\n"),
          data,
        })
      }
    }

    return data
  }

  prune(data: any): Array<T> {
    return this.validate(data).map((e) => this.item.prune(e))
  }
}
