- `Schema.generate` -- generate example data from schema -- for property based testing

- dict -- generate
- object -- generate
- tuple -- generate

- string -- generate
- format -- generate

- any -- generate
- guard -- generate

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
