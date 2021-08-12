import { Schema } from "../schema"
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

  validate(data: any): number {
    super.validate(data)

    if (!Number.isInteger(data)) {
      throw new Errors.InvalidData(data, {
        msg: "I expect the data to be integer.",
      })
    }

    return data
  }
}
