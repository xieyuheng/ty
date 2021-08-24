import * as Errors from "../errors"

export abstract class Schema<T> {
  abstract validate(data: any): T
  abstract json(): any

  isValid(data: any): data is T {
    try {
      this.validate(data)
      return true
    } catch (error) {
      if (Errors.InvalidData.guard(error)) {
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
          `  schema: ${JSON.stringify(this.json())}`,
        ].join("\n")
      )
    } catch (error) {
      if (Errors.InvalidData.guard(error)) {
        return
      } else {
        throw error
      }
    }
  }
}
