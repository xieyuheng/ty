`NumberSchema` -- take `constraint`
`StringSchema` -- take `constraint`

ty.url
ty.date

ty.validate -- Report recursively report error
ty.isValid
ty.prune
ty.assertInvalid -- for testing

# refactor

[refactor] the structure of `InvalidData` not well designed and is overloaded

- `omit` and `pick` need well structured error
