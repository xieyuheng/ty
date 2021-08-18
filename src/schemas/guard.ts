import { Schema } from "../schema"
import * as Errors from "../errors"
import * as ut from "../ut"

export class GuardSchema<T> extends Schema<T> {
  guard: (data: any) => data is T

  constructor(guard: (data: any) => data is T) {
    super()
    this.guard = guard
  }

  static create<T>(guard: (data: any) => data is T): GuardSchema<T> {
    return new GuardSchema(guard)
  }

  validate(data: any): T {
    if (!this.guard(data)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the data to be a guarded by: ${this.guard}`,
      })
    }

    return data
  }
}
