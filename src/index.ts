/**
 * A arbitrary-precision decimal class that uses BigInt to store the number.
 * The implementation considers the precision as the number of digits after
 * decimal point to keep. It uses trunc method to round the number.
 */
export class TinyFloat {
  /**
   * The BigInt representation of the number. It's multiplied by 10^precision.
   *
   * @private
   */
  private int: bigint;

  /**
   * The number of digits after decimal point to keep.
   *
   * @private
   */
  private precision: number;

  /**
   * Creates a TinyFloat instance from a string and given precision.
   *
   * @param str - The number string
   * @param precision - The number of digits after decimal point to keep
   */
  constructor(str?: string, precision?: number) {
    this.precision = precision ?? 9;
    this.int = str ? TinyFloat.parse(str, this.precision) : BigInt(0);
  }

  /**
   * Returns the number as a string. It keeps the zero padding according to
   * the precision.
   *
   * @returns The number string.
   */
  toString(): string {
    const str = (this.int < 0 ? -this.int : this.int).toString();
    const point = str.length - this.precision;
    return (
      (this.int < 0 ? "-" : "") +
      (point > 0
        ? str.slice(0, point) + "." + str.slice(point)
        : "0." + "0".repeat(Math.abs(point)) + str.slice(0))
    );
  }

  /**
   * Returns the number type.
   *
   * @returns The number
   */
  toNumber(): number {
    return parseFloat(this.toString());
  }

  /**
   * Adds two numbers.
   *
   * @param tf - The number to add
   *
   * @returns Sum of the two numbers
   */
  add(tf: TinyFloat): TinyFloat {
    const sum = new TinyFloat();
    sum.set(this.int + tf.withPresicion(this.precision).int, this.precision);
    return sum;
  }

  /**
   * Subtracts two numbers.
   *
   * @param tf - The number to subtract
   *
   * @returns Difference of the two numbers
   */
  sub(tf: TinyFloat): TinyFloat {
    const sub = new TinyFloat();
    sub.set(this.int - tf.withPresicion(this.precision).int, this.precision);
    return sub;
  }

  /**
   * Multiplies two numbers.
   *
   * @param tf - The number to multiply
   *
   * @returns Product of the two numbers
   */
  mul(tf: TinyFloat): TinyFloat {
    const mul = new TinyFloat();
    mul.set(
      (this.int * tf.withPresicion(this.precision).int) /
        BigInt(10 ** this.precision),
      this.precision
    );
    return mul;
  }

  /**
   * Divides two numbers.
   *
   * @param tf - The number to divide
   *
   * @returns Quotient of the two numbers
   */
  div(tf: TinyFloat): TinyFloat {
    const div = new TinyFloat();
    div.set(
      (this.int * BigInt(10 ** this.precision)) /
        tf.withPresicion(this.precision).int,
      this.precision
    );
    return div;
  }

  /**
   * Returns the remainder of the division of two numbers.
   *
   * @param tf - The number to divide
   *
   * @returns The remainder of the division
   */
  mod(tf: TinyFloat): TinyFloat {
    const mod = new TinyFloat();
    mod.set(this.int % tf.withPresicion(this.precision).int, this.precision);
    return mod;
  }

  /**
   * Returns a new TinyFloat with the new precision.
   *
   * @param precision - The new precision
   *
   * @returns A new TinyFloat with the new precision
   */
  withPresicion(precision: number): TinyFloat {
    if (this.precision === precision) return this;
    const tf = new TinyFloat();
    const pow = BigInt(10 ** Math.abs(this.precision - precision));
    const int = this.precision > precision ? this.int / pow : this.int * pow;
    tf.set(int, precision);
    return tf;
  }

  /**
   * Mutates the TinyFloat instance with the new BigInt and precision.
   *
   * @param int - The BigInt to set
   * @param precision - The precision to set
   *
   * @private
   */
  private set(int: bigint, precision: number): void {
    this.int = int;
    this.precision = precision;
  }

  /**
   * Parses the number string to BigInt.
   *
   * @param str - The number string
   *
   * @returns The BigInt representation of the number
   *
   * @private
   */
  private static parse(str: string, precision: number): bigint {
    const point = str.indexOf(".");
    if (point === -1) {
      return BigInt(str + "0".repeat(precision));
    } else {
      const intPart = str.slice(0, point);
      const floatPart = str.slice(point + 1, point + 1 + precision);
      return BigInt(
        intPart + floatPart + "0".repeat(precision - floatPart.length)
      );
    }
  }
}
