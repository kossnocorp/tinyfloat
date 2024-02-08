# TinyFloat

TinyFloat is a tiny decimal class for JavaScript.

It solves the main problem with the IEEE 754 floats (the notorious `0.1 + 0.2 == 0.30000000000000004`) without implementing an arbitrary-precision type that is more accurate but also heavier.

TinyFloat is **just `0.5 kB`** and has no dependencies, while [`decimal.js`](https://github.com/MikeMcl/decimal.js) is `12.3 kB`. In most cases, including working with money, the precision provided by `decimal.js` is irrelevant, so TinyFloat is an excellent alternative.

## Installation

The library is available as an [npm package](https://www.npmjs.com/package/tinyfloat):

```bash
npm install tinyfloat --save
```

## Usage

The library exports the `TinyFloat` class, which you can use to create decimal numbers:

```ts
import { TinyFloat } from "tinyfloat";

new TinyFloat("0.1").add("0.2").toNumber();
//=> 0.3
```

You can also set the precision for the `TinyFloat` instance:

```ts
new TinyFloat("0.123456", 2).toNumber();
//=> 0.12

new TinyFloat("0.987654321", 2).toNumber();
//=> 0.99
```

## API

The `TinyFloat` class has basic arithmetic methods:

- `add` - adds two numbers
- `sub` - subtracts two numbers
- `mul` - multiplies two numbers
- `div` - divides two numbers
- `mod` - returns the remainder of the division

To convert a `TinyFloat` instance to a number, use the `toNumber` method:

```ts
new TinyFloat("0.1").add("0.2").toNumber();
//=> 0.3
```

To convert the `TinyFloat` instance to a string, use the `toString` method:

```ts
new TinyFloat("0.1").add("0.2").toString();
//=> "0.3000000000000000"
```

The method pads the number with zeros to the set precision (default is 16).

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://kossnocorp.mit-license.org/)
