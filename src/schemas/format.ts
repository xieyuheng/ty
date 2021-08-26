import { Schema } from "../schema"
import * as Errors from "../errors"
import { StringSchema, StringConstraints } from "./string"
import { jsonSchemaFormatValidation } from "../json-schema"
import ty from ".."
import * as ut from "../ut"

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

  json(): { $format: string } {
    return { $format: this.format }
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

  prune(data: any): string {
    return this.validate(data)
  }

  private generateDate(): Date {
    const range = 10 * 12 * 30 * 24 * 60 * 60 * 1000
    const v = ty.int({ min: -range, max: range }).generate()
    return new Date(Date.now() + v)
  }

  generate(): string {
    if (this.format === "date") {
      const t = this.generateDate()
      return ut.formatDate(t)
    }

    if (this.format === "date-time") {
      const t = this.generateDate()
      return `${ut.formatDate(t)} ${ut.formatTime(t)}`
    }

    if (this.format === "time") {
      const t = this.generateDate()
      return ut.formatTime(t)
    }

    if (this.format === "email") {
      const username = ty.string({ max: 32 }).generate()
      const sitename = ty.string({ max: 16 }).generate()
      const domain = ty.string({ within: ["cn", "com", "org"] }).generate()
      return `${username}@${sitename}.${domain}`
    }

    if (this.format === "uri") {
      const subdomain = ty
        .array(ty.string({ max: 10 }))
        .generate()
        .join(".")
      const domain = ty.string({ within: ["cn", "com", "org"] }).generate()
      const address = `${subdomain}.${domain}`
      const path = ty.array(ty.string()).generate().join("/")
      return `https://${address}/${path}`
    }

    throw new Error(`I can not yet generate string from format: ${this.format}`)
  }
}
