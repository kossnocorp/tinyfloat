/**
 * A decimal class that uses BigInt to store the number.
 *
 * In the implementation, the precision is the number of digits after
 * the decimal point to keep. It adds one digit to handle rounding. The number
 * is rounded using the round half-up method.
 */
export class TinyFloat {
  /**
   * The default precision.
   */
  static readonly defaultPrecision = 16;

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
   * @param tf - The number to create
   * @param precision - The number of digits after decimal point to keep
   */
  constructor(tf?: string | TinyFloat, precision?: number) {
    if (tf instanceof TinyFloat) {
      this.precision = tf.precision;
      this.int = tf.int;
    } else {
      this.precision = precision ?? TinyFloat.defaultPrecision;
      this.int = tf ? TinyFloat.parse(tf, this.precision) : BigInt(0);
    }
  }

  /**
   * Returns the number as a string. It keeps the zero padding according to
   * the precision settings.
   *
   * @param precision - The precision to use
   *
   * @returns The number string.
   */
  toString(precision?: number | undefined): string {
    const precisionToUse = precision ?? this.precision;
    const int = this.transpose(precisionToUse);
    const absInt = int < 0 ? -int : int;

    const pow = 10n ** BigInt(precisionToUse + 1);
    const paddedFloatPart = absInt % pow;
    const rounding = paddedFloatPart % 10n >= 5n ? 10n : 0n;
    const adjustedInt = absInt + rounding;
    const intPart = adjustedInt / pow;
    const floatPart = adjustedInt % pow;

    return (
      (int < 0 ? "-" : "") +
      intPart.toString() +
      "." +
      floatPart
        .toString()
        .padStart(precisionToUse + 1, "0")
        .slice(0, precisionToUse)
    );
  }

  /**
   * Returns the number type.
   *
   * @param precision - The precision to use
   *
   * @returns The number
   */
  toNumber(precision?: number | undefined): number {
    return parseFloat(this.toString(precision));
  }

  /**
   * Adds two numbers.
   *
   * @param tf - The number to add
   *
   * @returns Sum of the two numbers
   */
  add(tf: TinyFloat | string): TinyFloat {
    return TinyFloat.fromBigInt(this.int + this.argument(tf), this.precision);
  }

  /**
   * Subtracts two numbers.
   *
   * @param tf - The number to subtract
   *
   * @returns Difference of the two numbers
   */
  sub(tf: TinyFloat | string): TinyFloat {
    return TinyFloat.fromBigInt(this.int - this.argument(tf), this.precision);
  }

  /**
   * Multiplies two numbers.
   *
   * @param tf - The number to multiply
   *
   * @returns Product of the two numbers
   */
  mul(tf: TinyFloat | string): TinyFloat {
    return TinyFloat.fromBigInt(
      (this.int * this.argument(tf)) / BigInt(10 ** (this.precision + 1)),
      this.precision
    );
  }

  /**
   * Divides two numbers.
   *
   * @param tf - The number to divide
   *
   * @returns Quotient of the two numbers
   */
  div(tf: TinyFloat | string): TinyFloat {
    return TinyFloat.fromBigInt(
      (this.int * BigInt(10 ** (this.precision + 1))) / this.argument(tf),
      this.precision
    );
  }

  /**
   * Returns the remainder of the division of two numbers.
   *
   * @param tf - The number to divide
   *
   * @returns The remainder of the division
   */
  mod(tf: TinyFloat | string): TinyFloat {
    return TinyFloat.fromBigInt(this.int % this.argument(tf), this.precision);
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
    return TinyFloat.fromBigInt(this.transpose(precision), precision);
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
   * Normalizes the string or TinyFloat to a BigInt
   *
   * @param tf - The instance or string to normalize
   *
   * @returns The BigInt representation of the number
   *
   * @private
   */
  private argument(tf: TinyFloat | string): bigint {
    return tf instanceof TinyFloat
      ? tf.withPresicion(this.precision).int
      : TinyFloat.parse(tf, this.precision);
  }

  /**
   * Transposes the BigInt representation to given precision.
   *
   * @param precision - The precision to transpose to
   *
   * @returns Transposed BigInt representation
   */
  private transpose(precision: number) {
    if (precision === this.precision) return this.int;
    const pow = BigInt(10 ** Math.abs(this.precision - precision));
    return this.precision > precision ? this.int / pow : this.int * pow;
  }

  /**
   * Parses the number string to BigInt.
   *
   * @param str - The number string
   * @param precision - The precision
   *
   * @returns The BigInt representation of the number
   *
   * @private
   */
  private static parse(str: string, precision: number): bigint {
    const digits = precision + 1;
    const point = str.indexOf(".");
    if (point === -1) {
      return BigInt(str + "0".repeat(digits));
    } else {
      const intPart = str.slice(0, point);
      const floatPart = str.slice(point + 1, point + 1 + digits);
      return BigInt(
        intPart + floatPart + "0".repeat(digits - floatPart.length)
      );
    }
  }

  /**
   * Creates a TinyFloat instance from a BigInt and precision.
   *
   * @param int - The BigInt to create
   * @param precision - The precision
   *
   * @returns The TinyFloat instance
   *
   * @private
   */
  private static fromBigInt(int: bigint, precision: number): TinyFloat {
    const tf = new TinyFloat();
    tf.set(int, precision);
    return tf;
  }
}
