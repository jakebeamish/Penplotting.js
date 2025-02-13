import { Vector } from "../Vector";
import { Line } from "../Line";

describe("Vector", () => {
  describe("constructor", () => {
    it("Returns a new vector object if creation is successful.", () => {
      const v = new Vector(1, 1);
      expect(typeof v).toBe("object");
      expect(v instanceof Vector).toBe(true);
    });

    test("Returns a new vector with default components (0, 0) if called without parameters.", () => {
      const vector = new Vector();
      expect(vector).toEqual({ x: 0, y: 0, z: 0 });
    });

    it("Throws a TypeError if any component is not a number. Currently does not throw if component is undefined.", () => {
      expect(() => new Vector(1, "a")).toThrow(TypeError);
      expect(() => new Vector(1, null)).toThrow(TypeError);
      expect(() => new Vector(1, {})).toThrow(TypeError);
      // expect(() => new Vector(undefined, 1)).toThrow(TypeError);
    });
  });

  describe("static methods", () => {
    describe("add", () => {
      it("Returns a new vector (4, 6) when adding (1, 2) and (3, 4).", () => {
        const v1 = new Vector(1, 2);
        const v2 = new Vector(3, 4);
        const expected = new Vector(4, 6);
        const result = Vector.add(v1, v2);
        expect(result).toEqual(expected);
      });
    });

    describe("subtract", () => {
      it("Returns a new vector (2, 2) when subtracting (1, 2) from (3, 4).", () => {
        const v1 = new Vector(3, 4);
        const v2 = new Vector(1, 2);
        const expected = new Vector(2, 2);
        const result = Vector.subtract(v1, v2);
        expect(result).toEqual(expected);
      });
    });

    describe("fromArray", () => {
      it("Returns a new vector with components {x: array[0], y: array[1]}.", () => {
        const x = 3;
        const y = 7;
        const array = [x, y];
        const vector = Vector.fromArray(array);
        expect(vector).toEqual(new Vector(x, y));
      });
    });

    describe("distance", () => {
      it("Returns the distance between two vectors.", () => {
        const a = new Vector(0, 0);
        const b = new Vector(5, 0);
        expect(Vector.distance(a, b)).toBeCloseTo(5);
      });
    });

    describe("distanceSquared", () => {
      it("Returns the distance squared between two vectors.", () => {
        const a = new Vector(0, 0);
        const b = new Vector(5, 0);
        expect(Vector.distanceSquared(a, b)).toBeCloseTo(25);
      });
    });

    describe("dot product", () => {
      it("Returns 10 for the dot product of (2,2) and (1,4).", () => {
        const a = new Vector(2, 2);
        const b = new Vector(1, 4);
        // (2 * 1) + (2 * 4) = 10
        const expected = 10;
        expect(Vector.dot(a, b)).toBeCloseTo(expected);
      });
    });

    describe("cross product", () => {
      it("Returns 6 for the cross product of (2,2) and (1,4).", () => {
        const a = new Vector(2, 2);
        const b = new Vector(1, 4);
        // (2 * 4) - (2 * 1) = 6
        const expected = 6;
        expect(Vector.cross(a, b)).toBeCloseTo(expected);
      });
    });

    describe("fromAngle", () => {
      it("Returns a new vector object with given angle and a default magnitude of 1.", () => {
        const vector = Vector.fromAngle(Math.PI);
        expect(vector instanceof Vector).toBeTruthy();
        expect(vector.getMagnitude()).toBe(1);
        expect(vector.getAngle()).toBe(Math.PI);
      });

      it("Returns a new vector object with given magnitude.", () => {
        const vector = Vector.fromAngle(0, 5);
        expect(vector.getMagnitude()).toBe(5);
        expect(vector.getAngle()).toBe(0);
      });
    });

    describe("lerp", () => {
      it("Returns a new vector object.", () => {
        const a = new Vector(0, 0);
        const b = new Vector(1, 1);
        const amount = 0.5;
        const result = Vector.lerp(a, b, amount);
        expect(result instanceof Vector).toBeTruthy();
      });

      it("Returns a new Vector with lerped components.", () => {
        const a = new Vector(0, 0);
        const b = new Vector(1, 1);
        const amount = 0.5;
        const result = Vector.lerp(a, b, amount);
        expect(result).toEqual(new Vector(0.5, 0.5));
      });
    });
  });

  describe("multiply", () => {
    it("Returns the vector after multiplying it by a scalar.", () => {
      const vector = new Vector(1, 1);
      const scalar = 10;
      vector.multiply(scalar);
      expect(vector).toEqual(new Vector(10, 10));
    });
  });

  describe("toArray", () => {
    it.each([
      { array: [0, 1, 3], vector: new Vector(0, 1, 3) },
      { array: [1, 5, 0], vector: new Vector(1, 5) },
      { array: [2, -3, 0], vector: new Vector(2, -3) },
      { array: [0, 0, 0], vector: new Vector(0, 0) },
    ])(
      "Returns $array when vector $vector .toArray is called.",
      ({ array, vector }) => {
        expect(vector.toArray()).toEqual(array);
      }
    );
  });

  describe("add", () => {
    it("Returns the vector after the addition of another vector.", () => {
      const vector = new Vector(1, 1);
      const addend = new Vector(3, 1);
      // x: 1 + 3 = 4
      // y: 1 + 1 = 2
      const expected = new Vector(4, 2);
      vector.add(addend);
      expect(vector).toEqual(expected);
    });
  });

  describe("rotate", () => {
    it("Rotates a vector by a given angle", () => {
      const vector = new Vector(1, 0);
      const angle = Math.PI / 2;
      vector.rotate(angle);
      const expected = new Vector(0, 1);
      expect(vector.x).toBeCloseTo(expected.x);
      expect(vector.y).toBeCloseTo(expected.y);
    });
  });

  describe("subtract", () => {
    it("Return the vector after subtraction of another vector.", () => {
      const vector = new Vector(1, 1);
      const subtrahend = new Vector(3, 1);
      // x: 1 - 3 = -2
      // y: 1 - 1 = 0
      const expected = new Vector(-2, 0);
      vector.subtract(subtrahend);
      expect(vector).toEqual(expected);
    });
  });

  describe("getAngle", () => {
    const angleTests = [
      { vector: new Vector(1, 0), expected: 0, description: "positive x-axis" },
      {
        vector: new Vector(0, 1),
        expected: Math.PI / 2,
        description: "positive y-axis",
      },
      {
        vector: new Vector(-1, 0),
        expected: Math.PI,
        description: "negative x-axis",
      },
      {
        vector: new Vector(0, -1),
        expected: -Math.PI / 2,
        description: "negative y-axis",
      },
      {
        vector: new Vector(1, 1),
        expected: Math.PI / 4,
        description: "first quadrant",
      },
      {
        vector: new Vector(-1, 1),
        expected: (3 * Math.PI) / 4,
        description: "second quadrant",
      },
      {
        vector: new Vector(-1, -1),
        expected: (-3 * Math.PI) / 4,
        description: "third quadrant",
      },
      {
        vector: new Vector(1, -1),
        expected: -Math.PI / 4,
        description: "fourth quadrant",
      },
    ];

    angleTests.forEach(({ vector, expected, description }) => {
      it(`Returns ${expected} radians for a vector along the ${description}`, () => {
        expect(vector.getAngle()).toBeCloseTo(expected);
      });
    });
  });

  describe("clone", () => {
    it("Returns a new vector object with the same x and y values.", () => {
      const a = new Vector(3, 5);
      const b = a.clone();
      expect(a).toEqual(b);
      expect(b).not.toBe(a);
    });
  });

  describe("isOnLine", () => {
    it("Returns true if a vector is a point on a line.", () => {
      const vector = new Vector(5, 0);
      const line = new Line(new Vector(0, 0), new Vector(10, 0));
      expect(vector.isOnLine(line)).toBeTruthy();
    });

    it("Returns false if a vector is not a point on a line.", () => {
      const vector = new Vector(5, 0);
      const line = new Line(new Vector(0, 1), new Vector(10, 1));
      expect(vector.isOnLine(line)).toBeFalsy();
    });
  });

  describe("getMagnitude", () => {
    it("Returns the magnitude of a vector.", () => {
      const vector = new Vector(10, 0);
      expect(vector.getMagnitude()).toBeCloseTo(10);
    });
  });

  describe("getMagnitudeSquared", () => {
    it("Returns the squared magnitude of a vector.", () => {
      const vector = new Vector(2, 0);
      expect(vector.getMagnitudeSquared()).toBeCloseTo(4);
    });
  });

  describe("setMagnitude", () => {
    it("Rescales the magnitude of a vector to a given amount.", () => {
      const vector = new Vector(1, 0);
      expect(vector.getMagnitude()).toBeCloseTo(1);

      vector.setMagnitude(10);
      expect(vector.getMagnitude()).toBeCloseTo(10);
    });
  });

  describe("distance", () => {
    it("Returns the distance between two vectors.", () => {
      const v1 = new Vector(0, 0);
      const v2 = new Vector(0, 10);
      expect(v1.distance(v2)).toBeCloseTo(10);
    });
  });

  describe("distanceSquared", () => {
    it("Returns the square of the distance between two vectors.", () => {
      const v1 = new Vector(0, 0);
      const v2 = new Vector(0, 10);
      expect(v1.distanceSquared(v2)).toBeCloseTo(100);
    });
  });
  describe("normalize", () => {
    it("Rescales the magnitude of a vector to 1.", () => {
      const vector = new Vector(5, 5);
      vector.normalize();
      expect(vector.getMagnitude()).toBeCloseTo(1);
    });

    it("Throws an Error if the vector magnitude is zero.", () => {
      const v = new Vector(0, 0);
      expect(() => {
        v.normalize();
      }).toThrowError("Cannot normalize a zero vector");
    });
  });

  describe("nearestNeighbour", () => {
    it("Returns the nearest neighbour from a given array.", () => {
      const a = new Vector(0, 0);
      const b = new Vector(1, 0);
      const c = new Vector(2, 0);
      const result = a.nearestNeighbour([a, b, c], 1);
      expect(result).toEqual([b]);
    });

    it("Does not include itself in the search even if it is a member of the queried array.", () => {
      const a = new Vector(0, 0);
      const b = new Vector(1, 0);
      const c = new Vector(2, 0);
      const result = a.nearestNeighbour([a, b, c], 3);
      expect(result).not.toEqual([a]);
      expect(result).toEqual([b, c, null]);
      expect(a.equals(result[0])).toBeFalsy();
    });
  });
});
