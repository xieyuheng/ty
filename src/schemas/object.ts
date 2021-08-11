import { Schema } from "../schema"
import * as Errors from "../errors"

type SchemaProperties<T> = { [P in keyof T]: Schema<T[P]> }
type Properties<T> = { [P in keyof T]: T[P] }

export class ObjectSchema<T> extends Schema<T> {
  properties: SchemaProperties<T>

  constructor(opts: { properties: SchemaProperties<T> }) {
    super()
    this.properties = opts.properties
  }

  static create<T>(properties: SchemaProperties<T>): ObjectSchema<T> {
    return new ObjectSchema<T>({ properties })
  }

  check(data: any): Properties<T> {
    for (const key in this.properties) {
      if (data.hasOwnProperty(key)) {
        try {
          this.properties[key].check(data[key])
        } catch (error) {
          if (error instanceof Errors.InvalidData) {
            error.keys.push(key)
          }
          throw error
        }
      } else {
        throw new Errors.InvalidData(data, {
          msg: `Missing required property: ${key}`,
          keys: [key],
        })
      }
    }

    return data
  }
}
