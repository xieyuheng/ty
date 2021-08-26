import { Schema } from "../schema"
import * as Errors from "../errors"
import * as ut from "../ut"

export class GuardSchema<T> extends Schema<T> {
  guard: (data: any) => data is T
  private gen?: () => T

  constructor(
    guard: (data: any) => data is T,
    opts: { generate?: () => T } = {}
  ) {
    super()
    this.guard = guard
    this.gen = opts.generate
  }

  static create<T>(
    guard: (data: any) => data is T,
    opts: { generate?: () => T } = {}
  ): GuardSchema<T> {
    return new GuardSchema(guard, opts)
  }

  json(): { $guard: any } {
    return { $guard: this.guard }
  }

  validate(data: any): T {
    if (!this.guard(data)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the data to be a guarded by: ${this.guard}`,
      })
    }

    return data
  }

  prune(data: any): T {
    return this.validate(data)
  }

  generate(): T {
    if (this.gen) {
      return this.gen()
    } else {
      throw new Error("The generate function of GuardSchema is not provided.")
    }
  }
}
