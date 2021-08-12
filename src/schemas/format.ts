import { Schema } from "../schema"
import * as Errors from "../errors"
import { StringSchema, StringConstraints } from "./string"
import { jsonSchemaFormatValidation } from "../json-schema"

export class FormatSchema extends StringSchema {
  format: string
  constraints: StringConstraints

  constructor(format: string, constraints: StringConstraints) {
    super(constraints)
    this.format = format
    this.constraints = constraints
  }

  static create(
    format: string,
    constraints: StringConstraints = {}
  ): FormatSchema {
    return new FormatSchema(format, constraints)
  }

  validate(data: any): string {
    super.validate(data)

    if (!jsonSchemaFormatValidation(this.format, data)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the data to be of format: ${this.format}`,
      })
    }

    return data
  }
}
