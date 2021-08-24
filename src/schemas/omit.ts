import { Schema } from "../schema"
import * as Errors from "../errors"

export class OmitSchema<T, Key extends string | number | symbol> extends Schema<
  Omit<T, Key>
> {
  schema: Schema<T>
  key: Key

  constructor(schema: Schema<T>, key: Key) {
    super()
    this.schema = schema
    this.key = key
  }

  static create<T, Key extends string | number | symbol>(
    schema: Schema<T>,
    keys: Key | Array<Key>
  ): OmitSchema<T, Key> {
    if (keys instanceof Array) {
      throw new Error()
    } else {
      return new OmitSchema(schema, keys)
    }
  }

  json(): { $omit: [any, string | number | symbol] } {
    return { $omit: [this.schema.json(), this.key] }
  }

  validate(data: any): Omit<T, Key> {
    try {
      this.schema.validate(data)
      return data
    } catch (error) {
      if (Errors.InvalidData.guard(error)) {
        const lastKey = error.keys[error.keys.length - 1]
        if (lastKey === this.key) {
          return data
        } else {
          throw error
        }
      }
      throw error
    }
  }
}
