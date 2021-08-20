import * as Errors from "../errors"

export abstract class Schema<T> {
  abstract validate(data: any): T

  isValid(data: any): data is T {
    try {
      this.validate(data)
      return true
    } catch (error) {
      if (error instanceof Errors.InvalidData) {
        return false
      } else {
        throw error
      }
    }
  }

  assertInvalid(data: any): void {
    try {
      this.validate(data)
      throw new Error(
        [
          `I expect the data to be invalid according to the schema.`,
          `  data: ${JSON.stringify(data)}`,
          `  schema: ${JSON.stringify(this)}`,
        ].join("\n")
      )
    } catch (error) {
      if (error instanceof Errors.InvalidData) {
        return
      } else {
        throw error
      }
    }
  }
}
