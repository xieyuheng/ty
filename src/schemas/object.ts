import * as Errors from "../errors"
import { Schema } from "../schema"
import * as ut from "../utils"

type PickUndefined<T> = {
  [P in keyof T as undefined extends T[P] ? P : never]: T[P]
}

type PickNotUndefined<T> = {
  [P in keyof T as undefined extends T[P] ? never : P]: T[P]
}

type OptionalUndefined<T> = {
  [K in keyof PickUndefined<T>]?: T[K]
} & {
  [K in keyof PickNotUndefined<T>]: T[K]
}

type SchemaObject<T> = { [P in keyof T]: Schema<T[P]> }

export class ObjectSchema<T> extends Schema<T> {
  properties: SchemaObject<T>

  constructor(opts: { properties: SchemaObject<T> }) {
    super()
    this.properties = opts.properties
  }

  static create<T>(
    properties: SchemaObject<T>
  ): ObjectSchema<OptionalUndefined<T>> {
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
    if (!ut.isObject(data)) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be object.",
      })
    }

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

  prune(data: any): T {
    const typedData = { ...this.validate(data) }
    const keys = Object.keys(this.properties)
    for (const key in typedData) {
      if (!keys.includes(key)) {
        delete typedData[key]
      }
    }

    return typedData
  }

  generate(): T {
    const data: any = {}
    for (const key in this.properties) {
      data[key] = this.properties[key].generate()
    }

    return data
  }
}
