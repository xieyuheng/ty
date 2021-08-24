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
    for (const key in this.properties) {
      try {
        this.properties[key].validate(data[key])
      } catch (error) {
        if (Errors.InvalidData.guard(error)) {
          error.keys.push(key)
        }
        throw error
      }
    }

    return data
  }
}
