import { ValidationReport } from "../errors"
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

  validate(data: any): number {
    super.validate(data)

    if (!Number.isInteger(data)) {
      throw new ValidationReport(data, {
        message: "I expect the data to be integer.",
      })
    }

    return data
  }
}
