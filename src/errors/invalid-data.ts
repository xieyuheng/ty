export class InvalidData extends Error {
  data: any
  msg: string
  keys: Array<string | number> = []

  constructor(
    data: any,
    opts: {
      msg: string
      keys?: Array<string | number>
    }
  ) {
    super()
    this.data = data
    this.msg = opts.msg
    this.keys = opts.keys || []
  }

  get path(): string {
    return this.keys
      .map((key) => (typeof key === "number" ? `[${key}]` : `.${key}`))
      .join("")
  }

  get message(): string {
    return [
      `${this.msg}`,
      `  path: ${this.path}`,
      `  data: ${JSON.stringify(this.data)}`,
    ].join("\n")
  }
}
