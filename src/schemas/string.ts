import { Schema } from "../schema"
import * as Errors from "../errors"

interface Constraints {
  max?: number
  min?: number
  length?: number
}

export class StringSchema extends Schema<string> {
  constraints: Constraints

  constructor(constraints: Constraints) {
    super()    
    this.constraints = constraints
  }

  static create(constraints: Constraints = {}): StringSchema {
    return new StringSchema(constraints)
  }

  validate(data: any): string {
    if (typeof data !== "string") {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be string.",
      })
    }

    const { max, min, length } = this.constraints

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

    return data
  }
}
