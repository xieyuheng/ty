import { Schema } from "../schema"
import * as Errors from "../errors"

export class OmitSchema<T, Key extends string> extends Schema<Omit<T, Key>> {
  schema: Schema<T>
  key: string

  constructor(schema: Schema<T>, key: Key) {
    super()
    this.schema = schema
    this.key = key
  }

  static create<T, Key extends string>(
    schema: Schema<T>,
    key: Key
  ): OmitSchema<T, Key> {
    return new OmitSchema(schema, key)
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
