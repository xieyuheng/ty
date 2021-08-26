import * as Errors from "../errors"
import { NumberSchema, NumberConstraints } from "./number"

export class IntSchema extends NumberSchema {
  constraints: NumberConstraints

  constructor(constraints: NumberConstraints) {
    super(constraints)
    this.constraints = constraints
  }

  static create(constraints: NumberConstraints = {}): IntSchema {
    return new IntSchema(constraints)
  }

  json(): "int" {
    return "int"
  }

  validate(data: any): number {
    super.validate(data)

    if (!Number.isInteger(data)) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be integer.",
      })
    }

    return data
  }

  generate(): number {
    let { min, max } = this.constraints

    // TODO The maximum is exclusive and the minimum is inclusive,
    //   thus the edge cases are not covered.

    if (min !== undefined && max !== undefined) {
      return Math.floor(Math.random() * (max - min) + min)
    } else if (min !== undefined) {
      max = min + Math.abs(1 / Math.random()) + 1
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    } else if (max !== undefined) {
      min = max - Math.abs(1 / Math.random()) - 1
      min = Math.ceil(min)
      return Math.floor(Math.random() * (max - min) + min)
    } else {
      min = -Math.abs(1 / Math.random()) - 1
      min = Math.ceil(min)
      max = Math.abs(1 / Math.random()) + 1
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    }
  }
}
