import { Report, isReport } from "../errors"
import { Schema } from "../schema"

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
    constraints: DictConstraints = {},
  ): DictSchema<T> {
    return new DictSchema(item, constraints)
  }

  validate(data: any): Record<string, T> {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      throw new Report(data, {
        message: "I expect the data to be dict.",
      })
    }

    const { max, min, length } = this.constraints

    if (max !== undefined && !(Object.keys(data).length <= max)) {
      throw new Report(data, {
        message: [
          `I expect the max dict length to be ${max}`,
          `  length: ${Object.keys(data).length}`,
        ].join("\n"),
      })
    }

    if (min !== undefined && !(Object.keys(data).length >= min)) {
      throw new Report(data, {
        message: [
          `I expect the min dict length to be ${min}`,
          `  length: ${Object.keys(data).length}`,
        ].join("\n"),
      })
    }

    if (length !== undefined && !(Object.keys(data).length === length)) {
      throw new Report(data, {
        message: [
          `I expect the dict length to be ${length}`,
          `  length: ${Object.keys(data).length}`,
        ].join("\n"),
      })
    }

    for (const [key, item] of Object.entries(data)) {
      try {
        this.item.validate(item)
      } catch (error) {
        if (isReport(error)) {
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
}
