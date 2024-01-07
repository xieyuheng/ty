import { isReport } from "../errors/index.js"
import { indent } from "../utils/indent.js"

export abstract class Schema<T> {
  abstract validate(data: any): T
  abstract prune(data: any): T

  isValid(data: any): data is T {
    try {
      this.validate(data)
      return true
    } catch (error) {
      if (isReport(error)) {
        return false
      } else {
        throw error
      }
    }
  }

  expectInvalid(data: any): void {
    try {
      this.validate(data)
      throw new Error(
        [
          `[expectInvalid] I expect the data to be invalid according to the schema.`,
          ``,
          `  data:`,
          indent(JSON.stringify(data, null, 2), "    "),
        ].join("\n"),
      )
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        console.log()
      } else {
        console.log(String(error))
        console.log()
      }
    }
  }
}
