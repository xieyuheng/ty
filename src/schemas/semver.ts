import semver from "semver"
import { FormatSchema } from "./format"
import { StringConstraints } from "./string"

export class SemverSchema extends FormatSchema {
  format = "semver"
  constraints: StringConstraints

  constructor(constraints: StringConstraints) {
    super("semver", constraints)
    this.constraints = constraints
  }

  static create(constraints: StringConstraints = {}): SemverSchema {
    return new SemverSchema(constraints)
  }

  protected checkFormat(data: any): boolean {
    return semver.valid(data) !== null
  }
}
