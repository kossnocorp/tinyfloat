class TinyFloat {
  int: BigInt;
  presicion: number;

  constructor(ft: string, presicion: number = 9) {
    this.presicion = presicion;

    const pointIndex = ft.indexOf(".");
    if (pointIndex === -1) {
      this.int = BigInt(ft + "0".repeat(presicion));
    } else {
      const intPart = ft.slice(0, pointIndex);
      const floatPart = ft.slice(pointIndex + 1, pointIndex + 1 + presicion);
      this.int = BigInt(
        intPart + floatPart + "0".repeat(presicion - floatPart.length)
      );
    }
  }

  toNumber(): number {
    // TODO: Make it right
    return parseFloat(this.int.toString()) / 10 ** this.presicion;
  }
}
