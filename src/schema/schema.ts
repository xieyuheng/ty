import * as Errors from "../errors"

export abstract class Schema<T> {
  abstract validate(data: any): T

  assertInvalidate(data: any): void {
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
