# TinyFloat

TinyFloat is a tiny decimal class for JavaScript.

It solves the main problem with the IEEE 754 floats (the notorious `0.1 + 0.2 == 0.30000000000000004`) without implementing an arbitrary-precision type that is more accurate but also heavier.

TinyFloat is **just `444 B`** and has no dependencies, while [`decimal.js`](https://github.com/MikeMcl/decimal.js) is `12.3 kB`. In most cases, including working with money, the precision provided by `decimal.js` is irrelevant, so TinyFloat is an excellent alternative.

## Installation

The library is available as an [npm package](https://www.npmjs.com/package/tinyfloat):

```bash
npm install tinyfloat --save
```

## Usage

TODO

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://kossnocorp.mit-license.org/)
