import { createReport } from "../errors"
import { NumberConstraint, NumberSchema } from "./number"

export class IntSchema extends NumberSchema {
  constructor(public constraint?: NumberConstraint) {
    super(constraint)
  }

  static create(
    options: {
      constraint?: NumberConstraint
    } = {},
  ): IntSchema {
    return new IntSchema(options?.constraint)
  }

  validate(data: any): number {
    super.validate(data)

    if (!Number.isInteger(data)) {
      throw createReport({
        message: `[IntSchema] I expect the data to be integer.`,
        data,
      })
    }

    return data
  }
}
