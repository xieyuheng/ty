- `Schema.generate` -- generate example data from schema -- for property based testing

- array -- generate

- int -- generate

- string -- generate
- format -- generate

- any -- generate
- guard -- generate
- object -- generate
- array -- generate
- tuple -- generate
- dict -- generate
- const -- generate
- union -- generate
- intersection -- generate
- omit -- generate
- omit-many -- generate
- pick -- generate
- pick-many -- generate
- lazy -- generate

- `Schema.generate` -- should be abstract

# refactor

- [refactor] the structure of `InvalidData` not well designed and is overloaded

  - `omit` and `pick` need well structured error
