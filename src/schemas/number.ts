import { Schema } from "../schema"
import * as Errors from "../errors"

interface Constraints {
  gt?: number
  lt?: number
  gte?: number
  lte?: number
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
        msg: "I expect the data to be number.",
      })
    }

    const { gt, lt, gte, lte } = this.constraints

    if (gt !== undefined && !(data > gt)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be greater than ${gt}`,
      })
    }

    if (lt !== undefined && !(data < lt)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be less than ${lt}`,
      })
    }

    if (gte !== undefined && !(data >= gte)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be greater than or equal to ${gte}`,
      })
    }

    if (lte !== undefined && !(data <= lte)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the number to be less than or equal to ${lte}`,
      })
    }

    return data
  }
}
