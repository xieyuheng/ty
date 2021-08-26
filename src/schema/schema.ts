import * as Errors from "../errors"

export abstract class Schema<T> {
  abstract json(): any
  abstract validate(data: any): T
  abstract prune(data: any): T
  abstract generate(): T

  testGeneration(opts: { n?: number; echo?: boolean } = {}): void {
    const n = opts.n || 100

    for (let i = 0; i < n; i++) {
      const data = this.generate()
      if (opts?.echo) {
        console.log(`generated data #${i}:`, data)
      }

      this.validate(data)
    }
  }

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
