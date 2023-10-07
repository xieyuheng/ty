import { isReport } from "../errors"
import { Schema } from "../schema"

export class PickSchema<T, Key extends keyof T> extends Schema<Pick<T, Key>> {
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
  ): PickSchema<T, Key> {
    return new PickSchema(schema, keys)
  }

  validate(data: any): Pick<T, Key> {
    try {
      this.schema.validate(data)
      return data
    } catch (error) {
      if (isReport(error)) {
        const lastKey = error.keys[error.keys.length - 1]
        if (lastKey instanceof Array) {
          if (lastKey.includes(this.key)) {
            throw error
          } else {
            return data
          }
        } else if (lastKey !== this.key) {
          return data
        } else {
          throw error
        }
      }
      throw error
    }
  }

  prune(data: any): Pick<T, Key> {
    const typedData = this.validate(data)
    return { [this.key]: typedData[this.key] } as Pick<T, Key>
  }
}
