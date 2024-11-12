import { describe, expect, it } from "vitest";
import { TinyFloat } from ".";

describe("TinyFloat", () => {
  it("accepts whole numbers", () => {
    expect(new TinyFloat("0").toNumber()).toBe(0);
    expect(new TinyFloat("1").toNumber()).toBe(1);
    expect(new TinyFloat("1234").toNumber()).toBe(1234);
    expect(new TinyFloat("123456789").toNumber()).toBe(123456789);
    expect(new TinyFloat("12345678901234567890").toNumber()).toBe(
      12345678901234567890
    );
  });

  it("accepts decimal numbers", () => {
    expect(new TinyFloat("0.1").toNumber()).toBe(0.1);
    expect(new TinyFloat("0.1234").toNumber()).toBe(0.1234);
    expect(new TinyFloat("12.34").toNumber()).toBe(12.34);
    expect(new TinyFloat("10.001234").toNumber()).toBe(10.001234);
    expect(new TinyFloat("0.001234").toNumber()).toBe(0.001234);
    expect(new TinyFloat("9876543210.123456789").toNumber()).toBe(
      9876543210.123456789
    );
  });

  it("accepts tiny float", () => {
    expect(new TinyFloat(new TinyFloat("0")).toNumber()).toBe(0);
    expect(new TinyFloat(new TinyFloat("1")).toNumber()).toBe(1);
    expect(
      new TinyFloat(new TinyFloat("12345678901234567890")).toNumber()
    ).toBe(12345678901234567890);
    expect(new TinyFloat(new TinyFloat("0.1")).toNumber()).toBe(0.1);
    expect(new TinyFloat(new TinyFloat("10.001234")).toNumber()).toBe(
      10.001234
    );
    expect(
      new TinyFloat(new TinyFloat("9876543210.123456789")).toNumber()
    ).toBe(9876543210.123456789);
  });

  it("accepts number", () => {
    expect(new TinyFloat(new TinyFloat(0)).toNumber()).toBe(0);
    expect(new TinyFloat(new TinyFloat(1)).toNumber()).toBe(1);
    expect(new TinyFloat(new TinyFloat(12345678901234567890)).toNumber()).toBe(
      12345678901234567890
    );
    expect(new TinyFloat(new TinyFloat(0.1)).toNumber()).toBe(0.1);
    expect(new TinyFloat(new TinyFloat(0.0000000000000001)).toNumber()).toBe(
      0.0000000000000001
    );
    expect(new TinyFloat(new TinyFloat(10.001234)).toNumber()).toBe(10.001234);
    expect(new TinyFloat(new TinyFloat(9876543210.123456789)).toNumber()).toBe(
      9876543210.123456789
    );
    expect(new TinyFloat(-0).toNumber()).toBe(0);
    expect(new TinyFloat(-1).toNumber()).toBe(-1);
    expect(new TinyFloat(new TinyFloat(-12345678901234567890)).toNumber()).toBe(
      -12345678901234567890
    );
    expect(new TinyFloat(new TinyFloat(-0.1)).toNumber()).toBe(-0.1);
    expect(new TinyFloat(new TinyFloat(-0.0000000000000001)).toNumber()).toBe(
      -0.0000000000000001
    );
    expect(new TinyFloat(new TinyFloat(-10.001234)).toNumber()).toBe(
      -10.001234
    );
    expect(new TinyFloat(new TinyFloat(-9876543210.123456789)).toNumber()).toBe(
      -9876543210.123456789
    );
  });

  it("rounds numbers", () => {
    expect(new TinyFloat("0.987654321", 0).toNumber()).toBe(1.0);
    expect(new TinyFloat("0.987654321", 1).toNumber()).toBe(1.0);
    expect(new TinyFloat("0.987654321", 2).toNumber()).toBe(0.99);
    expect(new TinyFloat("0.987654321", 3).toNumber()).toBe(0.988);
    expect(new TinyFloat("0.987654321", 5).toNumber()).toBe(0.98765);
    expect(new TinyFloat("0.123456789", 8).toNumber()).toBe(0.12345679);
    expect(new TinyFloat("-0.987654321", 0).toNumber()).toBe(-1.0);
    expect(new TinyFloat("-0.987654321", 1).toNumber()).toBe(-1);
    expect(new TinyFloat("-0.987654321", 2).toNumber()).toBe(-0.99);
    expect(new TinyFloat("0.7", 0).toNumber()).toBe(1);
    expect(new TinyFloat("-0.7", 0).toNumber()).toBe(-1);
    expect(new TinyFloat("0.5", 0).toNumber()).toBe(1);
    expect(new TinyFloat("-0.5", 0).toNumber()).toBe(-0);
    expect(new TinyFloat("0.07", 1).toNumber()).toBe(0.1);
    expect(new TinyFloat("-0.07", 1).toNumber()).toBe(-0.1);
    expect(new TinyFloat("0.12345678901234567").toNumber()).toBe(
      0.1234567890123457
    );
    expect(new TinyFloat("0.12345678901234563").toNumber()).toBe(
      0.1234567890123456
    );
    expect(new TinyFloat("9.9", 0).toNumber()).toBe(10);
  });

  it("has default precision corresponding to the number behavior", () => {
    expect(new TinyFloat("1.1").div(new TinyFloat("1.3")).toNumber()).toBe(
      1.1 / 1.3
    );
  });

  it("allows to specify precision", () => {
    expect(new TinyFloat("0.123456789", 5).toNumber()).toBe(0.12346);
    expect(new TinyFloat("0.123456789", 3).toNumber()).toBe(0.123);
    expect(new TinyFloat("0.0001234", 4).toNumber()).toBe(0.0001);
    expect(new TinyFloat("0.1234", 9).toNumber()).toBe(0.1234);
    expect(new TinyFloat("0.1234", 9).toNumber()).toBe(0.1234);
    expect(new TinyFloat("12.34", 1).toNumber()).toBe(12.3);
    expect(new TinyFloat("10.12345678901234", 1).toNumber()).toBe(10.1);
    expect(new TinyFloat("10.12345678901234", 12).toNumber()).toBe(
      10.123456789012
    );
  });

  it("accepts negative numbers", () => {
    expect(new TinyFloat("-0.123456789", 5).toNumber()).toBe(-0.12346);
    expect(new TinyFloat("-0.123456789", 3).toNumber()).toBe(-0.123);
    expect(new TinyFloat("-0.123456789", 1).toNumber()).toBe(-0.1);
    expect(new TinyFloat("-0.1", 3).toNumber()).toBe(-0.1);
    expect(new TinyFloat("-1").toNumber()).toBe(-1);
    expect(new TinyFloat("-1.2346", 3).toNumber()).toBe(-1.235);
    expect(new TinyFloat("-321.123456789").toNumber()).toBe(-321.123456789);
    expect(new TinyFloat("-321.123456789", 5).toNumber()).toBe(-321.12346);
  });

  describe("toString", () => {
    it("returns the number as a string", () => {
      expect(new TinyFloat("0").toString()).toBe("0.0000000000000000");
      expect(new TinyFloat("1").toString()).toBe("1.0000000000000000");
      expect(new TinyFloat("12345678901234567890").toString()).toBe(
        "12345678901234567890.0000000000000000"
      );
      expect(new TinyFloat("0.1234").toString()).toBe("0.1234000000000000");
      expect(new TinyFloat("12.34").toString()).toBe("12.3400000000000000");

      expect(new TinyFloat("0.1234", 6).toString()).toBe("0.123400");
      expect(new TinyFloat("10.12345678901234", 12).toString()).toBe(
        "10.123456789012"
      );
      expect(new TinyFloat("-0.123456789", 1).toString()).toBe("-0.1");
      expect(new TinyFloat("10.001234").toString()).toBe("10.0012340000000000");
      expect(new TinyFloat("10.1234123412341234").toString()).toBe(
        "10.1234123412341234"
      );
      expect(new TinyFloat("10.12341234123412341111").toString()).toBe(
        "10.1234123412341234"
      );
      expect(new TinyFloat("10.00000000000000001111").toString()).toBe(
        "10.0000000000000000"
      );
    });

    it("allows to specify the precision", () => {
      expect(new TinyFloat("0.987654321").toString(1)).toBe("1.0");
      expect(new TinyFloat("0.987654321").toString(2)).toBe("0.99");
      expect(new TinyFloat("0.987654321").toString(3)).toBe("0.988");
      expect(new TinyFloat("0.987654321").toString(5)).toBe("0.98765");
    });
  });

  describe("toNumber", () => {
    it("returns the number", () => {
      expect(new TinyFloat("0").toNumber()).toBe(0.0);
      expect(new TinyFloat("1").toNumber()).toBe(1.0);
      expect(new TinyFloat("12345678901234567890").toNumber()).toBe(
        12345678901234567890.0
      );
      expect(new TinyFloat("0.1234").toNumber()).toBe(0.1234);
      expect(new TinyFloat("12.34").toNumber()).toBe(12.34);

      expect(new TinyFloat("0.1234", 6).toNumber()).toBe(0.1234);
      expect(new TinyFloat("10.12345678901234", 12).toNumber()).toBe(
        10.123456789012
      );
      expect(new TinyFloat("-0.123456789", 1).toNumber()).toBe(-0.1);
    });

    it("allows to specify the precision", () => {
      expect(new TinyFloat("0.987654321").toNumber(1)).toBe(1.0);
      expect(new TinyFloat("0.987654321").toNumber(2)).toBe(0.99);
      expect(new TinyFloat("0.987654321").toNumber(3)).toBe(0.988);
      expect(new TinyFloat("0.987654321").toNumber(5)).toBe(0.98765);
    });
  });

  describe("add", () => {
    it("adds two numbers", () => {
      expect(new TinyFloat("0.1").add(new TinyFloat("0.2")).toNumber()).toBe(
        0.3
      );
      expect(new TinyFloat("-0.1").add(new TinyFloat("0.2")).toNumber()).toBe(
        0.1
      );
      expect(new TinyFloat("0.1").add(new TinyFloat("-0.3")).toNumber()).toBe(
        -0.2
      );
    });

    it("uses the precision of the first number", () => {
      expect(
        new TinyFloat("0.123456789", 1)
          .add(new TinyFloat("0.123456789"))
          .toNumber()
      ).toBe(0.2);
      expect(
        new TinyFloat("0.123456789", 2)
          .add(new TinyFloat("0.123456789"))
          .toNumber()
      ).toBe(0.25);
      expect(
        new TinyFloat("0.123456789", 4)
          .add(new TinyFloat("-0.123456789", 1))
          .toNumber()
      ).toBe(0.0035);
    });

    it("allows to pass a number as a string", () => {
      expect(new TinyFloat("0.1").add("0.2").toNumber()).toBe(0.3);
      expect(new TinyFloat("-0.1").add("0.2").toNumber()).toBe(0.1);
    });

    it("allows to pass a number", () => {
      expect(new TinyFloat(0.1).add(0.2).toNumber()).toBe(0.3);
      expect(new TinyFloat(-0.1).add(0.2).toNumber()).toBe(0.1);
    });
  });

  describe("sub", () => {
    it("subtracts two numbers", () => {
      expect(new TinyFloat("0.1").sub(new TinyFloat("0.2")).toNumber()).toBe(
        -0.1
      );
      expect(new TinyFloat("-0.1").sub(new TinyFloat("0.2")).toNumber()).toBe(
        -0.3
      );
      expect(new TinyFloat("0.1").sub(new TinyFloat("-0.3")).toNumber()).toBe(
        0.4
      );
    });

    it("uses the precision of the first number", () => {
      expect(
        new TinyFloat("0.123456789", 1).sub(new TinyFloat("0.19")).toNumber()
      ).toBe(-0.1);
      expect(
        new TinyFloat("0.123456789", 2).sub(new TinyFloat("0.19")).toNumber()
      ).toBe(-0.07);
      expect(
        new TinyFloat("0.123456789", 2)
          .sub(new TinyFloat("-0.123456789", 1))
          .toNumber()
      ).toBe(0.24);
    });

    it("allows to pass a number as a string", () => {
      expect(new TinyFloat("0.1").sub("0.2").toNumber()).toBe(-0.1);
      expect(new TinyFloat("-0.1").sub("0.2").toNumber()).toBe(-0.3);
    });

    it("allows to pass a number", () => {
      expect(new TinyFloat(0.1).sub(0.2).toNumber()).toBe(-0.1);
      expect(new TinyFloat(-0.1).sub(0.2).toNumber()).toBe(-0.3);
    });
  });

  describe("mul", () => {
    it("multiplies two numbers", () => {
      expect(new TinyFloat("6").mul(new TinyFloat("2")).toNumber()).toBe(12);
      expect(new TinyFloat("0.6").mul(new TinyFloat("0.2")).toNumber()).toBe(
        0.12
      );
      expect(new TinyFloat("0.06").mul(new TinyFloat("0.02")).toNumber()).toBe(
        0.0012
      );
      expect(
        new TinyFloat("6.17283945").mul(new TinyFloat("0.2")).toNumber()
      ).toBe(1.23456789);
      expect(new TinyFloat("6.2").mul(new TinyFloat("-2.1")).toNumber()).toBe(
        -13.02
      );
    });

    it("uses the precision of the first number", () => {
      expect(
        new TinyFloat("0.123456789", 3)
          .mul(new TinyFloat("0.123456789"))
          .toNumber()
      ).toBe(0.015);
      expect(
        new TinyFloat("0.123456789", 3)
          .mul(new TinyFloat("-0.123456789", 1))
          .toNumber()
      ).toBe(-0.015);
    });

    it("allows to pass a number as a string", () => {
      expect(new TinyFloat("6").mul("2").toNumber()).toBe(12);
      expect(new TinyFloat("0.6").mul("0.2").toNumber()).toBe(0.12);
    });

    it("allows to pass a number", () => {
      expect(new TinyFloat(6).mul(2).toNumber()).toBe(12);
      expect(new TinyFloat(0.6).mul(0.2).toNumber()).toBe(0.12);
    });
  });

  describe("div", () => {
    it("divides two numbers", () => {
      expect(new TinyFloat("6").div(new TinyFloat("2")).toNumber()).toBe(3);
      expect(
        new TinyFloat("1.23456789").div(new TinyFloat("0.2")).toNumber()
      ).toBe(6.17283945);
      expect(new TinyFloat("6.2").div(new TinyFloat("-2.1")).toNumber()).toBe(
        -2.9523809523809526
      );
    });

    it("uses the precision of the first number", () => {
      expect(
        new TinyFloat("0.123456789", 3)
          .div(new TinyFloat("0.123456789"))
          .toNumber()
      ).toBe(1);
      expect(
        new TinyFloat("0.123456789", 3)
          .div(new TinyFloat("-0.123456789", 1))
          .toNumber()
      ).toBe(-1.028);
    });

    it("allows to pass a number as a string", () => {
      expect(new TinyFloat("6").div("2").toNumber()).toBe(3);
      expect(new TinyFloat("0.6").div("0.2").toNumber()).toBe(3);
    });

    it("allows to pass a number", () => {
      expect(new TinyFloat(6).div(2).toNumber()).toBe(3);
      expect(new TinyFloat(0.6).div(0.2).toNumber()).toBe(3);
    });
  });

  describe("mod", () => {
    it("returns the remainder of the division", () => {
      expect(new TinyFloat("6").mod(new TinyFloat("2")).toNumber()).toBe(0);
      expect(new TinyFloat("6.6").mod(new TinyFloat("2")).toNumber()).toBe(0.6);
      expect(new TinyFloat("0.6").mod(new TinyFloat("2")).toNumber()).toBe(0.6);
      expect(new TinyFloat("6").mod(new TinyFloat("0.02")).toNumber()).toBe(0);
      expect(new TinyFloat("6.003").mod(new TinyFloat("0.02")).toNumber()).toBe(
        0.003
      );
      expect(new TinyFloat("6").mod(new TinyFloat("4")).toNumber()).toBe(2);
      expect(new TinyFloat("6").mod(new TinyFloat("5")).toNumber()).toBe(1);
      expect(new TinyFloat("6").mod(new TinyFloat("3.5")).toNumber()).toBe(2.5);
      expect(new TinyFloat("-6").mod(new TinyFloat("3.1")).toNumber()).toBe(
        -2.9
      );
      expect(new TinyFloat("6").mod(new TinyFloat("3")).toNumber()).toBe(0);
    });

    it("uses the precision of the first number", () => {
      expect(
        new TinyFloat("0.123456789", 3)
          .mod(new TinyFloat("0.123456789"))
          .toNumber()
      ).toBe(0);
      expect(
        new TinyFloat("0.123456789", 3)
          .mod(new TinyFloat("-0.123456789", 1))
          .toNumber()
      ).toBe(0.003);
    });

    it("allows to pass a number as a string", () => {
      expect(new TinyFloat("6").mod("2").toNumber()).toBe(0);
      expect(new TinyFloat("6.6").mod("2").toNumber()).toBe(0.6);
    });

    it("allows to pass a number", () => {
      expect(new TinyFloat(6).mod(2).toNumber()).toBe(0);
      expect(new TinyFloat(6.6).mod(2).toNumber()).toBe(0.6);
    });
  });

  describe("withPrecision", () => {
    it("changes the precision", () => {
      expect(new TinyFloat("0.123456789", 5).withPrecision(3).toNumber()).toBe(
        0.123
      );
      expect(new TinyFloat("0.123456789", 2).withPrecision(3).toNumber()).toBe(
        0.123
      );
      expect(new TinyFloat("-0.123456789", 2).withPrecision(3).toNumber()).toBe(
        -0.123
      );
    });

    it("rounds the number", () => {
      expect(new TinyFloat("0.123456789").withPrecision(5).toNumber()).toBe(
        0.12346
      );
      expect(new TinyFloat("0.123456789").withPrecision(6).toNumber()).toBe(
        0.123457
      );
    });
  });
});
