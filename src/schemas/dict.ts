import { Schema } from "../schema"
import * as Errors from "../errors"
import ty from ".."

export interface DictConstraints {
  max?: number
  min?: number
  length?: number
}

export class DictSchema<T> extends Schema<Record<string, T>> {
  item: Schema<T>
  constraints: DictConstraints
  
  constructor(item: Schema<T>, constraints: DictConstraints) {
    super()
    this.item = item
    this.constraints = constraints
  }

  static create<T>(
    item: Schema<T>,
    constraints: DictConstraints = {}
  ): DictSchema<T> {
    return new DictSchema(item, constraints)
  }

  json(): { $dict: any } {
    return { $dict: this.item.json() }
  }

  validate(data: any): Record<string, T> {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be dict.",
      })
    }

    const { max, min, length } = this.constraints

    if (max !== undefined && !(data.length <= max)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the max dict length to be ${max}`,
      })
    }

    if (min !== undefined && !(data.length >= min)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the min dict length to be ${min}`,
      })
    }

    if (length !== undefined && !(data.length === length)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the dict length to be ${length}`,
      })
    }

    for (const [key, item] of Object.entries(data)) {
      try {
        this.item.validate(item)
      } catch (error) {
        if (Errors.InvalidData.guard(error)) {
          error.keys.push(key)
        }
        throw error
      }
    }

    return data
  }

  prune(data: any): Record<string, T> {
    const typedData = this.validate(data)
    const record: Record<string, T> = {}
    for (const key in typedData) {
      record[key] = this.item.prune(typedData[key])
    }

    return record
  }

  generate(): Record<string, T> {
    const length = ty.number({ min: 0, max: 10 }).generate()
    const results: Record<string, T> = {}
    for (let i = 0; i < length; i++) {
      const key = ty.string({ max: 32 }).generate()
      results[key] = this.item.generate()
    }

    return results
  }
}
