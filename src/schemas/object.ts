import { appendReport, createReport } from "../errors"
import { Schema } from "../schema"
import { isObject } from "../utils/isObject"

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

  constructor(options: { properties: SchemaObject<T> }) {
    super()
    this.properties = options.properties
  }

  static create<T>(
    properties: SchemaObject<T>,
  ): ObjectSchema<OptionalUndefined<T>> {
    return new ObjectSchema<T>({ properties })
  }

  validate(data: any): T {
    if (!isObject(data)) {
      throw createReport({
        message: `[ObjectSchema] I expect the data to be object.`,
        data,
      })
    }

    for (const key in this.properties) {
      try {
        this.properties[key].validate(data[key])
      } catch (error) {
        throw appendReport(error, {
          message: `[ObjectSchema] I fail on key: ${key}.`,
          data,
        })
      }
    }

    return data
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
}
