import * as Errors from "../errors"
import { jsonSchemaFormatValidation } from "../json-schema"
import { StringConstraints, StringSchema } from "./string"

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
    constraints: StringConstraints = {},
  ): FormatSchema {
    return new FormatSchema(format, constraints)
  }

  json(): { $format: string } {
    return { $format: this.format }
  }

  protected checkFormat(data: any): boolean {
    return jsonSchemaFormatValidation(this.format, data)
  }

  validate(data: any): string {
    super.validate(data)

    if (!this.checkFormat(data)) {
      throw new Errors.InvalidData(data, {
        msg: `I expect the data to be of format: ${this.format}`,
      })
    }

    return data
  }

  prune(data: any): string {
    return this.validate(data)
  }
}
