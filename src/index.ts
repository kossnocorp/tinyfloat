/**
 * The {@link TinyFloat} class precision settings.
 */
export interface TinyFloatPrecision {
  /** The the number of digits after decimal point. */
  digits: number;
  /** The rounding padding. Defines how much extra precision is saved to
   * round the number. */
  padding: number;
}

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
  private precision: TinyFloatPrecision;

  /**
   * Creates a TinyFloat instance from a string and given precision.
   *
   * @param str - The number string
   * @param precision - The number of digits after decimal point to keep
   */
  constructor(str?: string, precision?: number | Partial<TinyFloatPrecision>) {
    this.precision = TinyFloat.normalizePrecision(precision);
    this.int = str ? TinyFloat.parse(str, this.precision) : BigInt(0);
  }

  /**
   * Returns the number as a string. It keeps the zero padding according to
   * the precision settings.
   *
   * @returns The number string.
   */
  toString(): string {
    const absInt = this.int < 0 ? -this.int : this.int;

    const paddedPow = 10n ** BigInt(this.digits);
    const paddingPow = 10n ** BigInt(this.precision.padding);

    const intPart = absInt / paddedPow;
    const paddedFloatPart = absInt % paddedPow;

    const halfPadding = 5n * 10n ** BigInt(this.precision.padding - 1);
    const rounding =
      paddedFloatPart % paddingPow >= halfPadding ? paddingPow : 0n;

    const floatPart = (paddedFloatPart + rounding) / paddingPow;
    const floatPartStr = floatPart.toString();

    return (
      (this.int < 0 ? "-" : "") +
      intPart.toString() +
      "." +
      floatPartStr
        .padStart(this.precision.digits, "0")
        .slice(0, this.precision.digits)
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
        BigInt(10 ** this.precision.digits),
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
      (this.int * BigInt(10 ** this.precision.digits)) /
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
  withPresicion(precision: number | TinyFloatPrecision): TinyFloat {
    const normalizedPrecision = TinyFloat.normalizePrecision(precision);
    if (
      this.precision.digits === normalizedPrecision.digits &&
      this.precision.padding === normalizedPrecision.padding
    )
      return this;

    const tf = new TinyFloat();
    const pow = BigInt(
      10 **
        Math.abs(
          this.digits -
            (normalizedPrecision.digits + normalizedPrecision.padding)
        )
    );
    const int =
      this.digits > normalizedPrecision.digits + normalizedPrecision.padding
        ? this.int / pow
        : this.int * pow;
    tf.set(int, normalizedPrecision);
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
  private set(int: bigint, precision: TinyFloatPrecision): void {
    this.int = int;
    this.precision = precision;
  }

  /**
   * Returns the number of digits after decimal point to keep. It includes the
   * precision and rounding padding.
   *
   * @private
   */
  private get digits(): number {
    return this.precision.digits + this.precision.padding;
  }

  /**
   * Parses the number string to BigInt.
   *
   * @param str - The number string
   * @param precision - The precision settings
   *
   * @returns The BigInt representation of the number
   *
   * @private
   */
  private static parse(str: string, precision: TinyFloatPrecision): bigint {
    const digits = precision.digits + precision.padding;
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
   * Normalizes the precision settings.
   *
   * @param precision - The precision settings, number or undefined
   *
   * @returns The normalized precision settings
   */
  private static normalizePrecision(
    precision: number | Partial<TinyFloatPrecision> | undefined
  ): TinyFloatPrecision {
    const digits =
      typeof precision === "number" ? precision : precision?.digits ?? 16;
    const padding = typeof precision !== "number" ? precision?.padding ?? 3 : 3;
    return { digits, padding };
  }
}
