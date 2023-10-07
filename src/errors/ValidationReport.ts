export class ValidationReport extends Error {
  data: any
  message: string
  keys: Array<string | number | symbol | Array<string | number | symbol>> = []

  // NOTE We can not use `instanceof` to check whether an error is `ValidationReport`,
  //   because `ty` might be imported by different clients,
  //   and the schema written by them might be composed together.
  // When this happened, different references to the `ValidationReport` class,
  //   will not be viewed as the same by `instanceof`.
  private instanceofValidationReport = true

  constructor(
    data: any,
    options: {
      message: string
      keys?: Array<string | number | symbol | Array<string | number | symbol>>
    },
  ) {
    super()
    this.data = data
    this.message = options.message
    this.keys = options.keys || []
  }

  get message(): string {
    return this.message
  }
}
