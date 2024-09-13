import { PRNG } from "../Random";
import { Mulberry32 } from "../Random";
import { XORShift32 } from "../Random";
import { LCG } from "../Random";
import { Vector } from "../Vector";

describe("PRNG", () => {
  describe("constructor", () => {
    const prng = new PRNG();
    function maxValue() {
      prng.maxValue();
    }
    function next() {
      prng.next();
    }

    it("Throws an error if maxValue() is called directly.", () => {
      expect(maxValue).toThrow(
        new Error("Method maxValue() must be implemented."),
      );
    });

    it("Throws an error if next() is called directly.", () => {
      expect(next).toThrow(new Error("Method next() must be implemented."));
    });
  });

  describe("next", () => {
    it("Generates the same sequence of numbers for the same seed.", () => {
      const seed = 12345;
      const lcg1 = new LCG(seed);
      const lcg2 = new LCG(seed);

      for (let i = 0; i < 5; i++) {
        expect(lcg1.randomFloat()).toBeCloseTo(lcg2.randomFloat());
      }
    });

    it("Generates different sequences for different seeds.", () => {
      const lcg1 = new LCG(12345);
      const lcg2 = new LCG(54321);

      const sequence1 = [];
      const sequence2 = [];

      for (let i = 0; i < 5; i++) {
        sequence1.push(lcg1.randomFloat());
        sequence2.push(lcg2.randomFloat());
      }

      expect(sequence1).not.toEqual(sequence2);
    });
  });

  describe("randomInteger", () => {
    const lcg = new LCG(12345);
    let x = lcg.randomInteger(0, 10);
    it("Always returns an integer.", () => {
      expect(typeof x).toBe("number");
      expect(x).toBe(parseInt(x));
    });

    it("Returns integers between min and max.", () => {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(10);
    });
  });

  describe("randomFloat", () => {
    it("Returns values between 0 and 1.", () => {
      let lcg = new LCG();

      for (let i = 0; i < 100; i++) {
        let value = lcg.randomFloat();
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
      }
    });
  });

  describe("randomUnitVector", () => {
    it("Returns a Vector of length 1.", () => {
      let prng = new Mulberry32();
      let vector = prng.randomUnitVector();
      expect(vector instanceof Vector).toBeTruthy();
      expect(vector.getMagnitude()).toBeCloseTo(1);
    });
  });

  describe("randomChance", () => {
    it("Returns true if the chance parameter is greater than a random float between 0 and 1.", () => {
      let prng = new Mulberry32();
      let actualValue = prng.randomChance(1);

      expect(actualValue).toBeTruthy();
    });

    it("Returns a boolean.", () => {
      let prng = new Mulberry32();

      expect(typeof prng.randomChance(0.5)).toBe("boolean");
    });

    it("Returns true if default value (0.5) is greater than a random float between 0 and 1.", () => {
      let prng1 = new Mulberry32(1);
      let prng2 = new Mulberry32(1);

      expect(prng1.randomChance()).toBe(prng2.randomChance(0.5));
    });
  });

  describe("randomElement", () => {
    it("Returns an element from the array it is passed.", () => {
      const prng = new XORShift32();
      const array = ["beer", "wine", "juice"];
      const element = prng.randomElement(array);

      expect(array).toContain(element);
    });
  });

  describe("randomBipolarFloat", () => {
    it("Returns a number between -1 and 1.", () => {
      let prng = new Mulberry32();
      let randomValue = prng.randomBipolarFloat();

      expect(randomValue).toBeGreaterThanOrEqual(-1);
      expect(randomValue).toBeLessThan(1);
    });
  });

  describe("randomWeighted", () => {
    let prng, choices;
    beforeEach(() => {
      prng = new Mulberry32();
      choices = [
        {
          option: "red",
          weight: 0.1,
        },
        {
          option: "green",
          weight: 0.5,
        },
        {
          option: function () {
            return "blue";
          },
          weight: 0.4,
        },
      ];
    });

    it("Returns an option from the choices it is passed.", () => {
      for (let i = 0; i < 10; i++) {
        const result = prng.randomWeighted(choices);
        expect(result).toMatch(/red|green|blue/);
      }
    });
  });
});
