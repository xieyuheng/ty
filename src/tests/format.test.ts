import ty from ".."

{
  const schema = ty.format("date")
  const data0: string = schema.validate("1893-12-26")
  schema.assertInvalid("1893-12")
}

{
  const schema = ty.format("date-time")
  const data0: string = schema.validate("2018-11-13 20:20:39")
  const data1: string = schema.validate("2018-11-13T20:20:39+00:00")
  const data2: string = schema.validate("2022-08-03T19:29:52.325Z")
  const data3: string = schema.validate(new Date().toISOString())
  schema.assertInvalid("2018-11-13")
}

{
  const schema = ty.format("time")
  const data0: string = schema.validate("20:20:39+00:00")
  const data1: string = schema.validate("20:20:39")
  schema.assertInvalid("20:20")
}

{
  const schema = ty.format("uri")
  const data0: string = schema.validate("https://tools.ietf.org/html/rfc3986")
  const data1: string = schema.validate(encodeURI("https://网站.com"))
  schema.assertInvalid("tools.ietf.org/html/rfc3986")
  schema.assertInvalid("https://网站.com")
}

{
  const schema = ty.format("email")
  const data0: string = schema.validate("user@example.com")
  schema.assertInvalid("example.com")
  schema.assertInvalid("用户@例子.广告")
}

// NOTE syntax sugar

{
  const schema = ty.date()
  const data: string = schema.validate("1893-12-26")
  schema.assertInvalid("1893-12")
}

{
  const schema = ty.time()
  const data0: string = schema.validate("20:20:39+00:00")
  const data1: string = schema.validate("20:20:39")
  schema.assertInvalid("20:20")
}

{
  const schema = ty.uri()
  const data0: string = schema.validate("https://tools.ietf.org/html/rfc3986")
  const data1: string = schema.validate(encodeURI("https://网站.com"))
  schema.assertInvalid("tools.ietf.org/html/rfc3986")
  schema.assertInvalid("https://网站.com")
}

{
  const schema = ty.email()
  const data0: string = schema.validate("user@example.com")
  schema.assertInvalid("example.com")
  schema.assertInvalid("用户@例子.广告")
}

// generate

{
  const schema = ty.format("date")
  schema.testGeneration()
}

{
  const schema = ty.format("date-time")
  schema.testGeneration()
}

{
  const schema = ty.format("time")
  schema.testGeneration()
}

{
  const schema = ty.format("uri")
  schema.testGeneration()
}

{
  const schema = ty.format("email")
  schema.testGeneration()
}
