import { ValidationReport } from "../errors"
import { Schema } from "../schema"

export class GuardSchema<T> extends Schema<T> {
  guard: (data: any) => data is T

  constructor(guard: (data: any) => data is T) {
    super()
    this.guard = guard
  }

  static create<T>(guard: (data: any) => data is T): GuardSchema<T> {
    return new GuardSchema(guard)
  }

  json(): { $guard: any } {
    return { $guard: this.guard }
  }

  validate(data: any): T {
    if (!this.guard(data)) {
      throw new ValidationReport(data, {
        msg: `I expect the data to be a guarded by: ${this.guard}`,
      })
    }

    return data
  }

  prune(data: any): T {
    return this.validate(data)
  }
}
