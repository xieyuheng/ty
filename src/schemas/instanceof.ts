import { ValidationReport } from "../errors"
import { Schema } from "../schema"

type Constructor = abstract new (...args: Array<any>) => any

export class InstanceofSchema<T extends Constructor> extends Schema<
  InstanceType<T>
> {
  givenClass: T

  constructor(givenClass: T) {
    super()
    this.givenClass = givenClass
  }

  static create<T extends Constructor>(givenClass: T): InstanceofSchema<T> {
    return new InstanceofSchema(givenClass)
  }

  validate(data: any): InstanceType<T> {
    if (!(data instanceof this.givenClass)) {
      throw new ValidationReport(data, {
        msg: [
          `I expect the data to be instance of given class`,
          `  given class name: ${this.givenClass.name}`,
          `  data class name: ${data.constructor.name}`,
        ].join("\n"),
      })
    }

    return data
  }

  prune(data: any): InstanceType<T> {
    return this.validate(data)
  }
}
