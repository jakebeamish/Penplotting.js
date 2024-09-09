import { decToHex, hexToDec, fract, sinFract, map, wrap, lerp } from "../utils";

describe("decToHex", () => {
  test("Returns '5' if passed 5 and length is set to 1", () => {
    expect(decToHex(5, 1)).toBe("5");
  });

  test("Returns '005' if passed 5 and length is set to 3.", () => {
    expect(decToHex(5, 3)).toBe("005");
  });

  test("Returns 'aaaaaaaa' if passed 2863311530", () => {
    expect(decToHex(2863311530)).toBe("aaaaaaaa");
  });
});

describe("hexToDec", () => {
  test("Returns integer numbers.", () => {
    const hex = "FFF";
    expect(typeof hexToDec(hex)).toBe("number");
  });
  test("Returns '5' if passed 5.", () => {
    expect(hexToDec("5")).toBe(5);
  });

  test("Returns 2863311530 if passed 'aaaaaaaa'.", () => {
    expect(hexToDec("aaaaaaaa")).toBe(2863311530);
  });
});

describe("fract", () => {
  test("Returns 0.42 with input of 1.42.", () => {
    let x = fract(1.42);
    expect(x).toBeCloseTo(0.42);
  });

  test("Returns 0.77 with input of -42.23.", () => {
    let x = fract(-42.23);
    expect(x).toBeCloseTo(0.77);
  });

  test("Returns numbers in the range [0,1)", () => {
    let x = fract(Math.random() * 0xffffff);
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(1);
  });
});

describe("lerp", () => {
  test("Returns a number.", () => {
    let x = lerp(0, 1, 0.5);
    expect(typeof x).toBe("number");
  });

  test("Returns the midpoint between values when the amount is 0.5.", () => {
    const a = 12;
    const b = 24;
    const amount = 0.5;

    expect(lerp(a, b, amount)).toBe(a + (b - a) / 2);
  });
});

describe("map", () => {
  test("If withinBounds = true, the output should be constrained by min2 and max2.", () => {
    let val = 10;
    let min1 = 0;
    let max1 = 100;
    let min2 = 5;
    let max2 = 6;

    let output = map(val, min1, max1, min2, max2, true);

    expect(output).toBeLessThanOrEqual(max2);
    expect(output).toBeGreaterThanOrEqual(min2);
  });

  test("If withinBounds = false, the output should not be constrained by min2 and max2.", () => {
    let val = 11;
    let min1 = 0;
    let max1 = 10;
    let min2 = 5;
    let max2 = 6;

    let output = map(val, min1, max1, min2, max2);

    expect(output).toBeGreaterThan(max2);
  });
});

describe("sinFract", () => {
  test("Correctly computes the sinFract value for given inputs.", () => {
    // Example inputs and expected outputs
    const testCases = [
      {
        x: 1,
        y: 2,
        a: 0.5,
        b: 0.3,
        m: 10,
        expected: fract(Math.sin(1 * 0.5 + 2 * 0.3) * 10),
      },
      {
        x: 0,
        y: 0,
        a: 1,
        b: 1,
        m: 1,
        expected: fract(Math.sin(0 * 1 + 0 * 1) * 1),
      },
      {
        x: -1,
        y: -2,
        a: 0.2,
        b: 0.4,
        m: 5,
        expected: fract(Math.sin(-1 * 0.2 + -2 * 0.4) * 5),
      },
      // Add more test cases as needed
    ];

    testCases.forEach(({ x, y, a, b, m, expected }) => {
      expect(sinFract(x, y, a, b, m)).toBeCloseTo(expected);
    });
  });
});

describe("wrap", () => {
  test("Returns numbers between min and max.", () => {
    const min = 0;
    const max = 7;
    let x = wrap(-1, min, max);

    expect(x).toBeGreaterThanOrEqual(min);
    expect(x).toBeLessThan(max);
  });
});
