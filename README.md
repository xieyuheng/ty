# Ty

A schema checker that returns well typed results.

## API Docs

**primitive:**
- [ty.string()](src/tests/string.test.ts)
- [ty.format(<foramt-name>)](src/tests/format.test.ts)
- [ty.number()](src/tests/number.test.ts)
- [ty.int()](src/tests/int.test.ts)
- [ty.boolean()](src/tests/boolean.test.ts)
- [ty.null()](src/tests/null.test.ts)
- [ty.undefined()](src/tests/undefined.test.ts)
- [ty.any()](src/tests/any.test.ts)

**compound:**
- [ty.object({ ...<property-schema> })](src/tests/object.test.ts)
- [ty.array(<item-type>)](src/tests/array.test.ts)
- [ty.dict(<item-type>)](src/tests/dict.test.ts)

**set theory:**
- [ty.dict(<data>)](src/tests/same.test.ts)
- [ty.union(<left-schema>, <rigth-schema>)](src/tests/union.ts)
- [ty.intersection(<left-schema>, <rigth-schema>)](src/tests/intersection.test.ts)

**structural:**
- [ty.intersection(<schema>, <key>)](src/tests/omit.ts)

## Contributions

> Be polite, do not bring negative emotion to others.

- [TODO.md](TODO.md)
- [STYLE-GUIDE.md](STYLE-GUIDE.md)
- [CODE-OF-CONDUCT.md](CODE-OF-CONDUCT.md)
- When contributing, add yourself to [AUTHORS](AUTHORS)

## License

- [GPLv3](LICENSE)
