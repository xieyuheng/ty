import { Schema } from "../schema"
import * as Errors from "../errors"

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

  validate(data: any): T {
    for (const key in this.properties) {
      if (!data.hasOwnProperty(key)) {
        throw new Errors.InvalidData(data, {
          msg: `I found a missing required property: ${key}`,
          keys: [key],
        })
      }

      try {
        this.properties[key].validate(data[key])
      } catch (error) {
        if (error instanceof Errors.InvalidData) {
          error.keys.push(key)
        }
        throw error
      }
    }

    return data
  }
}
