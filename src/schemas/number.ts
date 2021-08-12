import { Schema } from "../schema"
import * as Errors from "../errors"

interface Constraints {
  max?: number
  min?: number
  length?: number
}

export class NumberSchema extends Schema<number> {
  constraints: Constraints

  constructor(constraints: Constraints) {
    super()
    this.constraints = constraints
  }

  static create(constraints: Constraints = {}): NumberSchema {
    return new NumberSchema(constraints)
  }

  validate(data: any): number {
    if (typeof data !== "number") {
      throw new Errors.InvalidData(data, {
        msg: "I am expecting the data to be number.",
      })
    }

    return data
  }
}
