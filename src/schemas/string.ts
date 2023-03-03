import ty from ".."
import * as Errors from "../errors"
import { Schema } from "../schema"
import { randomHexString } from "../utils/randomHexString"

export interface StringConstraints {
  max?: number
  min?: number
  length?: number
  within?: Array<string>
}

export class StringSchema extends Schema<string> {
  constraints: StringConstraints

  constructor(constraints: StringConstraints) {
    super()
    this.constraints = constraints
  }

  static create(constraints: StringConstraints = {}): StringSchema {
    return new StringSchema(constraints)
  }

  json(): any {
    return "string"
  }

  validate(data: any): string {
    if (typeof data !== "string") {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be string.",
      })
    }

    const { max, min, length, within } = this.constraints

    if (max !== undefined && !(data.length <= max)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the max string length to be ${max}`,
      })
    }

    if (min !== undefined && !(data.length >= min)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the min string length to be ${min}`,
      })
    }

    if (length !== undefined && !(data.length === length)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the string length to be ${length}`,
      })
    }

    if (within !== undefined && !within.includes(data)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the string to be within: ${within.join(", ")}`,
      })
    }

    return data
  }

  prune(data: any): string {
    return this.validate(data)
  }

  generate(): string {
    const { max, min, length, within } = this.constraints

    if (within) {
      const i = Math.floor(Math.random() * within.length)
      return within[i]
    }

    const size = length || ty.int({ min: min || 1, max: max || 10 }).generate()

    if (size === 0) return ""

    return randomHexString(Math.ceil(size / 2)).slice(0, size)
  }
}
