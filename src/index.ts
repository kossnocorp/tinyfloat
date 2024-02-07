/**
 * A arbitrary-precision decimal class that uses BigInt to store the number.
 * The implementation considers the presicion as the number of digits after
 * decimal point to keep. It uses trunc method to round the number.
 */
export class TinyFloat {
  /**
   * The BigInt representation of the number. It's multiplied by 10^presicion.
   *
   * @private
   */
  private int: bigint;

  /**
   * The number of digits after decimal point to keep.
   *
   * @private
   */
  private presicion: number;

  /**
   * Creates a TinyFloat instance from a string and given presicion.
   *
   * @param str - The number string
   * @param presicion - The number of digits after decimal point to keep
   */
  constructor(str?: string, presicion?: number) {
    this.presicion = presicion ?? 9;
    this.int = str ? TinyFloat.parse(str, this.presicion) : BigInt(0);
  }

  /**
   * Returns the number as a string. It keeps the zero padding according to
   * the presicion.
   *
   * @returns The number string.
   */
  toString(): string {
    const str = (this.int < 0 ? -this.int : this.int).toString();
    const point = str.length - this.presicion;
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
    sum.set(this.int + tf.withPresicion(this.presicion).int, this.presicion);
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
    sub.set(this.int - tf.withPresicion(this.presicion).int, this.presicion);
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
      (this.int * tf.withPresicion(this.presicion).int) /
        BigInt(10 ** this.presicion),
      this.presicion
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
      (this.int * BigInt(10 ** this.presicion)) /
        tf.withPresicion(this.presicion).int,
      this.presicion
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
    mod.set(this.int % tf.withPresicion(this.presicion).int, this.presicion);
    return mod;
  }

  /**
   * Returns a new TinyFloat with the new presicion.
   *
   * @param presicion - The new presicion
   *
   * @returns A new TinyFloat with the new presicion
   */
  withPresicion(presicion: number): TinyFloat {
    if (this.presicion === presicion) return this;
    const tf = new TinyFloat();
    const pow = BigInt(10 ** Math.abs(this.presicion - presicion));
    const int = this.presicion > presicion ? this.int / pow : this.int * pow;
    tf.set(int, presicion);
    return tf;
  }

  /**
   * Mutates the TinyFloat instance with the new BigInt and presicion.
   *
   * @param int - The BigInt to set
   * @param presicion - The presicion to set
   *
   * @private
   */
  private set(int: bigint, presicion: number): void {
    this.int = int;
    this.presicion = presicion;
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
  private static parse(str: string, presicion: number): bigint {
    const point = str.indexOf(".");
    if (point === -1) {
      return BigInt(str + "0".repeat(presicion));
    } else {
      const intPart = str.slice(0, point);
      const floatPart = str.slice(point + 1, point + 1 + presicion);
      return BigInt(
        intPart + floatPart + "0".repeat(presicion - floatPart.length)
      );
    }
  }
}
