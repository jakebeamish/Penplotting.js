import { PRNG } from "../Random";
import { AABB } from "../AABB";
import { Circle } from "../Circle";
import { Mulberry32 } from "../Random";
import { XORShift32 } from "../Random";
import { LCG } from "../Random";
import { Vector } from "../Vector";

describe("PRNG", () => {
  /**
   * @type {PRNG}
   * This is a default instance of the PRNG class.
   */
  let prng;

  beforeEach(() => {
    prng = new PRNG();
  });

  describe("PRNG algorithms", () => {
    const algorithms = [Mulberry32, XORShift32, LCG];
    algorithms.forEach((algorithm) => {
      describe(`using the ${algorithm.name} algorithm`, () => {
        let prng;

        beforeEach(() => {
          prng = new PRNG({ algorithm });
        });

        it("Can be created using the algorithm.", () => {
          expect(prng.algorithm).toBeInstanceOf(algorithm);
        });

        it(`Returns random values in the range [0-1) when it is sent
          .randomFloat().`, () => {
          const result = prng.randomFloat();
          expect(result).toBeGreaterThanOrEqual(0);
          expect(result).toBeLessThan(1);
        });
      });
    });
  });

  describe("next", () => {
    it("Generates the same sequence of numbers for the same seed.", () => {
      const seed = 12345;
      const prng1 = new PRNG({ seed });
      const prng2 = new PRNG({ seed });

      for (let i = 0; i < 5; i++) {
        expect(prng1.randomFloat()).toBeCloseTo(prng2.randomFloat());
      }
    });

    it("Generates different sequences for different seeds.", () => {
      const prng1 = new PRNG({ seed: 12345 });
      const prng2 = new PRNG({ seed: 54321 });

      const sequence1 = [];
      const sequence2 = [];

      for (let i = 0; i < 5; i++) {
        sequence1.push(prng1.randomFloat());
        sequence2.push(prng2.randomFloat());
      }

      expect(sequence1).not.toEqual(sequence2);
    });
  });

  describe("randomInteger", () => {
    /**
     * @type {number}
     * This is a random integer between 0 and 10.
     */
    let x;
    beforeEach(() => {
      x = prng.randomInteger(0, 10);
    });
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
      for (let i = 0; i < 100; i++) {
        let value = prng.randomFloat();
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
      }
    });

    it.each([
      [1, 0],
      [10, 0],
      [-1, 0],
    ])(
      "Given a single argument, returns a value between 0 and that argument (%i).",
      (max, min) => {
        if (max < min) {
          let temp = max;
          max = min;
          min = temp;
        }

        let value = prng.randomFloat(max);
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThanOrEqual(max);
      }
    );
  });

  it.each([
    [1, 4],
    [0.001, 0.01],
    [-1, -10],
  ])(
    "Given two arguments (%i and %i), returns a value in that range.",
    (min, max) => {
      if (max < min) {
        let temp = max;
        max = min;
        min = temp;
      }

      let value = prng.randomFloat(min, max);
      expect(value).toBeGreaterThanOrEqual(min);
      expect(value).toBeLessThanOrEqual(max);
    }
  );

  describe("randomGaussian", () => {
    it("Returns only the mean if the standard deviation is 0.", () => {
      for (let i = 0; i < 100; i++) {
        const result = prng.randomGaussian(1, 0);
        expect(result).toEqual(1);
      }
    });

    it("Returns values that fit a normal distribution.", () => {
      for (let i = 0; i < 100; i++) {
        const result = prng.randomGaussian();
        expect(result).toBeLessThan(9);
        expect(result).toBeGreaterThan(-9);
      }
    });
  });

  describe("randomUnitVector", () => {
    it("Returns a Vector of length 1.", () => {
      let vector = prng.randomUnitVector();
      expect(vector instanceof Vector).toBeTruthy();
      expect(vector.getMagnitude()).toBeCloseTo(1);
    });
  });

  describe("randomVectorInAABB", () => {
    it("Returns a Vector that is within a given AABB.", () => {
      const box = new AABB(0, 0, 5, 5);
      for (let i = 0; i < 100; i++) {
        const result = prng.randomVectorInAABB(box);
        expect(box.contains(result)).toBeTruthy();
      }
    });
  });

  describe("randomVectorInCircle", () => {
    it("Returns a Vector that is within a given Circle.", () => {
      const circle = new Circle(0, 0, 1);
      for (let i = 0; i < 100; i++) {
        const result = prng.randomVectorInCircle(circle);
        const distance = Vector.distance(
          result,
          new Vector(circle.x, circle.y)
        );
        expect(distance).toBeLessThan(circle.radius);
      }
    });
  });

  describe("randomChance", () => {
    it("Returns true if the chance parameter is greater than a random float between 0 and 1.", () => {
      let actualValue = prng.randomChance(1);
      expect(actualValue).toBeTruthy();
    });

    it("Returns a boolean.", () => {
      expect(typeof prng.randomChance(0.5)).toBe("boolean");
    });

    it("Returns true if default value (0.5) is greater than a random float between 0 and 1.", () => {
      let prng1 = new PRNG(1);
      let prng2 = new PRNG(1);

      expect(prng1.randomChance()).toBe(prng2.randomChance(0.5));
    });
  });

  describe("randomElement", () => {
    it("Returns an element from the array it is passed.", () => {
      const array = ["beer", "wine", "juice"];
      const element = prng.randomElement(array);

      expect(array).toContain(element);
    });
  });

  describe("randomSample", () => {
    it("Returns a random sample without replacement.", () => {
      const array = [1, 2, 3];
      const sampleSize = 2;
      const result = prng.randomSample(array, sampleSize);

      const validSamples = [
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 3],
        [3, 1],
        [3, 2],
      ];

      expect(result).toHaveLength(sampleSize);
      expect(
        validSamples.some(
          (sample) => JSON.stringify(sample) === JSON.stringify(result)
        )
      ).toBeTruthy();
    });

    it("Throws an error if sample size is larger than array length.", () => {
      const array = [];
      const size = 1;
      expect(() => {
        prng.randomSample(array, size);
      }).toThrow();
    });

    it("Throws an error if sample size is not a positive integer.", () => {
      expect(() => {
        prng.randomSample([], "a");
      }).toThrow();

      expect(() => {
        prng.randomSample([], -1);
      }).toThrow();
    });
  });

  describe("randomBipolarFloat", () => {
    it("Returns a number between -1 and 1.", () => {
      let randomValue = prng.randomBipolarFloat();

      expect(randomValue).toBeGreaterThanOrEqual(-1);
      expect(randomValue).toBeLessThan(1);
    });
  });

  describe("randomWeighted", () => {
    let choices;
    beforeEach(() => {
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
