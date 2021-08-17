import { Schema } from "../schema"
import * as Errors from "../errors"

export class LazySchema<T> extends Schema<T> {
  thunk: () => Schema<T>

  constructor(thunk: () => Schema<T>) {
    super()
    this.thunk = thunk
  }

  static create<T>(thunk: () => Schema<T>): LazySchema<T> {
    return new LazySchema(thunk)
  }

  validate(data: any): T {
    const schema = this.thunk()
    return schema.validate(data)
  }
}
