import { Schema } from "../schema"
import * as Errors from "../errors"

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
}
