import { Schema } from "../schema"
import * as Errors from "../errors"

export interface NumberConstraints {
  min?: number
  max?: number
}

function validateNumberConstraints({ min, max }: NumberConstraints): boolean {
  // NOTE comparing `undefined` with number, will always return `false`.
  if ((min as any) > (max as any)) return false
  else return true
}

export class NumberSchema extends Schema<number> {
  constraints: NumberConstraints

  constructor(constraints: NumberConstraints) {
    super()
    if (validateNumberConstraints(constraints)) {
      this.constraints = constraints
    } else {
      throw new Error(
        `Invalid NumberConstraints: ${JSON.stringify(constraints)}`
      )
    }
  }

  static create(constraints: NumberConstraints = {}): NumberSchema {
    return new NumberSchema(constraints)
  }

  json(): any {
    return "number"
  }

  validate(data: any): number {
    if (typeof data !== "number") {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be number.",
      })
    }

    const { min, max } = this.constraints

    if (min !== undefined && !(data >= min)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be greater than or equal to ${min}`,
      })
    }

    if (max !== undefined && !(data <= max)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be less than or equal to ${max}`,
      })
    }

    return data
  }

  prune(data: any): number {
    return this.validate(data)
  }

  generate(): number {
    let { min, max } = this.constraints

    if (min !== undefined && max !== undefined) {
      return Math.random() * (max - min) + min
    } else if (min !== undefined) {
      max = min + Math.abs(1 / Math.random())
      return Math.random() * (max - min) + min
    } else if (max !== undefined) {
      min = max - Math.abs(1 / Math.random())
      return Math.random() * (max - min) + min
    } else {
      min = -Math.abs(1 / Math.random())
      max = Math.abs(1 / Math.random())
      return Math.random() * (max - min) + min
    }
  }
}
