import { ValidationReport, isValidationReport } from "../errors"
import { Schema } from "../schema"

type SchemaTuple<T extends Array<any>> = { [P in keyof T]: Schema<T[P]> }

export class TupleSchema<T extends Array<any>> extends Schema<T> {
  readonly items: SchemaTuple<T>

  constructor(opts: { items: SchemaTuple<T> }) {
    super()
    this.items = opts.items
  }

  static create<T extends Array<any>>(
    ...items: SchemaTuple<T>
  ): TupleSchema<T> {
    return new TupleSchema({ items })
  }

  validate(data: any): T {
    if (!(data instanceof Array)) {
      throw new ValidationReport(data, {
        msg: "I expect the data to be tuple.",
      })
    }

    for (let i = 0; i < data.length; i++) {
      try {
        this.items[i].validate(data[i])
      } catch (error) {
        if (isValidationReport(error)) {
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
