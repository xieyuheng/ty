import { ValidationReport } from "../errors"
import { Schema } from "../schema"

export interface NumberConstraints {
  min?: number
  max?: number
}

export class NumberSchema extends Schema<number> {
  constructor(public constraints: NumberConstraints) {
    super()
  }

  static create(constraints: NumberConstraints = {}): NumberSchema {
    return new NumberSchema(constraints)
  }

  validate(data: any): number {
    if (typeof data !== "number") {
      throw new ValidationReport(data, {
        message: "I expect the data to be number.",
      })
    }

    const { min, max } = this.constraints

    if (min !== undefined && !(data >= min)) {
      throw new ValidationReport(data, {
        message: `I expect the number to be greater than or equal to ${min}`,
      })
    }

    if (max !== undefined && !(data <= max)) {
      throw new ValidationReport(data, {
        message: `I expect the number to be less than or equal to ${max}`,
      })
    }

    return data
  }

  prune(data: any): number {
    return this.validate(data)
  }
}
