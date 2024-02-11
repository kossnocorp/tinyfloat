import b from "benny";
import { TinyFloat } from "./src";
import { Decimal } from "decimal.js";

const x = "5032485723458348569331745.33434346346912144534543";
const y = "0.046875000000";

b.suite(
  "Constructor",

  b.add("TinyFloat", () => {
    new TinyFloat(x);
  }),

  b.add("decimal.js", () => {
    new Decimal(x);
  }),

  b.cycle(),
  b.complete()
);

const tfX = new TinyFloat(x);
const tfY = new TinyFloat(y);
const decX = new Decimal(x);
const decY = new Decimal(y);

b.suite(
  "add",

  b.add("TinyFloat", () => {
    tfX.add(tfY);
  }),

  b.add("decimal.js", () => {
    decX.add(decY);
  }),

  b.cycle(),
  b.complete()
);

b.suite(
  "sub",

  b.add("TinyFloat", () => {
    tfX.sub(tfY);
  }),

  b.add("decimal.js", () => {
    decX.sub(decY);
  }),

  b.cycle(),
  b.complete()
);

b.suite(
  "mul",

  b.add("TinyFloat", () => {
    tfX.mul(tfY);
  }),

  b.add("decimal.js", () => {
    decX.mul(decY);
  }),

  b.cycle(),
  b.complete()
);

b.suite(
  "mod",

  b.add("TinyFloat", () => {
    tfX.mod(tfY);
  }),

  b.add("decimal.js", () => {
    decX.mod(decY);
  }),

  b.cycle(),
  b.complete()
);
