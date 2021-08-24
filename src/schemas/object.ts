import { Schema } from "../schema"
import * as Errors from "../errors"
import * as Schemas from "../schemas"

type SchemaObject<T> = { [P in keyof T]: Schema<T[P]> }

export class ObjectSchema<T> extends Schema<T> {
  properties: SchemaObject<T>

  constructor(opts: { properties: SchemaObject<T> }) {
    super()
    this.properties = opts.properties
  }

  static create<T>(properties: SchemaObject<T>): ObjectSchema<T> {
    return new ObjectSchema<T>({ properties })
  }

  json(): Record<string, any> {
    const record: Record<string, any> = {}
    for (const key in this.properties) {
      record[key] = this.properties[key].json()
    }

    return record
  }

  validate(data: any): T {
    const keys: Array<string> = []
    const errors: Array<Errors.InvalidData> = []
    for (const key in this.properties) {
      try {
        this.properties[key].validate(data[key])
      } catch (error) {
        if (Errors.InvalidData.guard(error)) {
          keys.push(key)
          errors.push(error)
        } else {
          throw error
        }
      }
    }

    const firstError = errors[0]

    if (firstError === undefined) {
      return data
    } else if (errors.length === 1) {
      firstError.keys.push(keys[0])
      throw firstError
    } else {
      firstError.keys.push(keys)
      throw firstError
    }
  }
}
