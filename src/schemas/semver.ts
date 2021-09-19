import { StringConstraints } from "./string"
import { FormatSchema } from "./format"
import ty from ".."
import semver from "semver"
import { customAlphabet } from "nanoid"

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

  generate(): string {
    const major = ty.int({ min: 0, max: 100 }).generate()
    const minor = ty.int({ min: 0, max: 100 }).generate()
    const patch = ty.int({ min: 0, max: 100 }).generate()

    const flag = ty.boolean().generate()

    if (flag) {
      const nanoid = customAlphabet("1234567890abcdef", 6)
      const preReleaseId = nanoid()
      return `${major}.${minor}.${patch}-${preReleaseId}`
    } else {
      return `${major}.${minor}.${patch}`
    }
  }
}