import Ty from "../main"

const data: {
  first_name: string
  last_name: string
} = Ty.object({
  first_name: Ty.string(),
  last_name: Ty.string(),
}).check({
  first_name: "Yuheng",
  last_name: "Xie",
})
