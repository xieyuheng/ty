import { isReport } from "../errors"
import { Schema } from "../schema"

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
    keys: Key,
  ): OmitSchema<T, Key> {
    return new OmitSchema(schema, keys)
  }

  validate(data: any): Omit<T, Key> {
    try {
      this.schema.validate(data)
      return data
    } catch (error) {
      if (isReport(error)) {
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
}
