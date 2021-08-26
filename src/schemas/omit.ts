import { Schema } from "../schema"
import * as Errors from "../errors"

export class OmitSchema<T, Key extends keyof T> extends Schema<Omit<T, Key>> {
  schema: Schema<T>
  key: Key

  constructor(schema: Schema<T>, key: Key) {
    super()
    this.schema = schema
    this.key = key
  }

  static create<T, Key extends keyof T>(
    schema: Schema<T>,
    keys: Key
  ): OmitSchema<T, Key> {
    return new OmitSchema(schema, keys)
  }

  json(): { $omit: [any, Key] } {
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

  prune(data: any): Omit<T, Key> {
    const typedData = { ...this.validate(data) }
    delete (typedData as T)[this.key]
    return typedData
  }

  generate(): Omit<T, Key> {
    return this.prune(this.schema.generate())
  }
}
