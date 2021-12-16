import { customAlphabet } from "nanoid"
import semver from "semver"
import ty from ".."
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

  generate(): string {
    const major = ty.int({ min: 0, max: 100 }).generate()
    const minor = ty.int({ min: 0, max: 100 }).generate()
    const patch = ty.int({ min: 0, max: 100 }).generate()

    const flag = ty.boolean().generate()

    if (flag) {
      // NOTE `preReleaseId` can not be a numebr starts with 0
      // - '0123' is invalid
      const head = customAlphabet("123456789abcdef", 1)
      const tail = customAlphabet("1234567890abcdef", 6)
      const preReleaseId = head() + tail()
      return `${major}.${minor}.${patch}-${preReleaseId}`
    } else {
      return `${major}.${minor}.${patch}`
    }
  }
}
