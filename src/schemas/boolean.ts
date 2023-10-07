import { ValidationReport } from "../errors"
import { Schema } from "../schema"

export class BooleanSchema extends Schema<boolean> {
  static create(): BooleanSchema {
    return new BooleanSchema()
  }

  validate(data: any): boolean {
    if (typeof data !== "boolean") {
      throw new ValidationReport(data, {
        msg: "I expect the data to be boolean.",
      })
    }

    return data
  }

  prune(data: any): boolean {
    return this.validate(data)
  }
}
