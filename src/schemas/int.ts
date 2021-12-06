import * as Errors from "../errors"
import { NumberConstraints, NumberSchema } from "./number"

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

    if (min !== undefined && max !== undefined) {
      return randomInt(min, max)
    } else if (min !== undefined) {
      max = min + Math.abs(1 / Math.random()) + 1
      return randomInt(min, max)
    } else if (max !== undefined) {
      min = max - Math.abs(1 / Math.random()) - 1
      return randomInt(min, max)
    } else {
      min = -Math.abs(1 / Math.random()) - 1
      max = Math.abs(1 / Math.random()) + 1
      return randomInt(min, max)
    }
  }
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
