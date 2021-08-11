import { Schema } from "../schema"

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
    console.log(data)
    return data
  }
}
