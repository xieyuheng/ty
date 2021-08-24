import { Schema } from "../schema"
import * as Errors from "../errors"

export class PickManySchema<
  T,
  Keys extends Readonly<Array<keyof T>>
> extends Schema<Pick<T, Keys[number]>> {
  schema: Schema<T>
  keys: Keys

  constructor(schema: Schema<T>, keys: Keys) {
    super()
    this.schema = schema
    this.keys = keys
  }

  static create<T, Keys extends Readonly<Array<keyof T>>>(
    schema: Schema<T>,
    keys: Keys
  ): PickManySchema<T, Keys> {
    return new PickManySchema(schema, keys)
  }

  json(): { $pickMany: [any, Readonly<Array<keyof T>>] } {
    return { $pickMany: [this.schema.json(), this.keys] }
  }

  validate(data: any): Pick<T, Keys[number]> {
    try {
      this.schema.validate(data)
      return data
    } catch (error) {
      if (Errors.InvalidData.guard(error)) {
        const lastKey = error.keys[error.keys.length - 1]
        if (lastKey instanceof Array) {
          if (lastKey.every((key) => !this.keys.includes(key as keyof T))) {
            return data
          } else {
            throw error
          }
        } else if (!this.keys.includes(lastKey as keyof T)) {
          return data
        } else {
          throw error
        }
      }
      throw error
    }
  }
}
