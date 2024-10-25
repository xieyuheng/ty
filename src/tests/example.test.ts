import { test } from "node:test"
import ty, { type Obtain } from "../index.js"

test("example", () => {
  const userSchema = ty.object({
    id: ty.int({ constraint: (x) => x >= 0 }),
    first_name: ty.string(),
    last_name: ty.string(),
  })

  type User = Obtain<typeof userSchema>

  // NOTE We can extract a `User` type from the type of `userSchema`,
  //   which will be the same as the following type definition:

  // type User = {
  //   id: number
  //   first_name: string
  //   last_name: string
  // }

  const data: any = {
    id: 1,
    first_name: "Yuheng",
    last_name: "Xie",
  }

  const user: User = userSchema.validate(data)
})
