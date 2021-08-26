import ty from ".."

const userSchema = ty.object({
  id: ty.int({ min: 0 }),
  first_name: ty.string(),
  last_name: ty.string(),
})

type User = {
  id: number
  first_name: string
  last_name: string
}

{
  const data: any = {
    id: 1,
    first_name: "Yuheng",
    last_name: "Xie",
  }

  const user: User = userSchema.validate(data)
}

{
  const data: any = {
    id: 2,
    first_name: "Yuxie",
    last_name: "Heng",
  }

  const user: User = userSchema.validate(data)
}

{
  const data: any = {
    id: 3,
    first_name: "Xieheng",
    last_name: "Yu",
  }

  const user: User = userSchema.validate(data)
}

{
  const data: any = {
    first_name: "Yuheng",
    last_name: "Xie",
  }

  const userOmitId: Omit<User, "id"> = ty.omit(userSchema, "id").validate(data)
}

{
  const user: User = userSchema.generate()

  userSchema.validate(user)

  // console.log(user)
}
