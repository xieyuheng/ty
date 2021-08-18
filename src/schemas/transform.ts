import { Schema } from "../schema"
import * as Errors from "../errors"
import * as Schemas from "../schemas"
import ty from ".."

type Var = {
  isVar: true
  id: number
  name: string
}

const varSchema = ty.object({
  isVar: ty.const(true as const),
  id: ty.number(),
  name: ty.string(),
})

const v: Var = varSchema.validate("")

type Logical<T> = Var | { [P in keyof T]: Logical<T[P]> }

// function logicalSchema<T>(schema: Schema<T>): Schema<Logical<T>> {
//   return ty.union(varSchema, new TransformSchema(logicalSchema, schema))
// }

function logicalSchema<T>(
  schema: Schema<T>
): Schema<{ [P in keyof T]: Logical<T[P]> }> {
  // return ty.union(varSchema, new TransformSchema(logicalSchema, schema))
  return new TransformSchema(logicalSchema, schema)
}

type SchemaObject<T> = { [P in keyof T]: Schema<T[P]> }

export class TransformSchema<T, B> extends Schema<B> {
  schemaFn: (schema: Schema<T>) => Schema<B>
  schema: Schema<T>

  constructor(schemaFn: (schema: Schema<T>) => Schema<B>, schema: Schema<T>) {
    super()
    this.schemaFn = schemaFn
    this.schema = schema
  }

  // static create<T>(properties: SchemaObject<T>): ObjectSchema<T> {
  //   return new ObjectSchema<T>({ properties })
  // }

  validate(data: any): B {
    // for (const key in this.properties) {
    //   try {
    //     this.properties[key].validate(data[key])
    //   } catch (error) {
    //     if (error instanceof Errors.InvalidData) {
    //       error.keys.push(key)
    //     }
    //     throw error
    //   }
    // }

    return data
  }
}
