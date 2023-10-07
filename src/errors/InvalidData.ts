export class InvalidData extends Error {
  data: any
  msg: string
  keys: Array<string | number | symbol | Array<string | number | symbol>> = []

  constructor(
    data: any,
    opts: {
      msg: string
      keys?: Array<string | number | symbol | Array<string | number | symbol>>
    },
  ) {
    super()
    this.data = data
    this.msg = opts.msg
    this.keys = opts.keys || []
  }

  // NOTE We can not use `instanceof` to check whether an error is `InvalidData`,
  //   because `ty` might be imported by different clients,
  //   and the schema written by them might be composed together.
  // When this happened, different references to the `InvalidData` class,
  //   will not be viewed as the same by `instanceof`.
  // Thus we need to write our type guard.

  private instanceofInvalidData = "ty"

  static guard(error: any): error is InvalidData {
    return error["instanceofInvalidData"] === "ty"
  }

  get message(): string {
    return this.msg
  }
}
