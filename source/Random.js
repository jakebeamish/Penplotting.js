import { Vector } from "./Vector.js";

/**
 * A PRNGAlgorithm is a class that implements some technique for random number
 * generation. It should have a seed and max value, as well as a next function.
 * @typedef PRNGAlgorithm
 * @prop {number} seed - The initial state of the PRNG.
 * @prop {number} max - The maximum possible value of the PRNG.
 * @prop {function(): number} next - The next psuedo-random number between 0 and 1.
 */

/**
 * @class
 */
export class PRNG {
  /**
   * Creates an instance of PRNG.
   * @param {Object} [options={}] - The configuration options for the PRNG.
   * @param {number} [options.seed=Date.now()] - The default seed value for the PRNG is the current timestamp.
   * @param {PRNGAlgorithm} [options.algorithm=XORShift32] - The algorithm to use
   * for generating psuedo-random numbers.
   */
  constructor({ seed = Date.now(), algorithm = XORShift32 } = {}) {
    this.seed = seed;
    this.algorithm = new algorithm(this.seed);
  }

  /**
   * Generate a random float in the range [0, 1).
   * @param {number} [max=1] - A single argument specifies a range of between 0 and that number.
   * @param {number} [min=0] - Two numeric arguments specifies a range.
   * @returns {number} - A floating-point number in a given range, 0 (inclusive) and 1 (exclusive) if called without arguments.
   */
  randomFloat(max = 1, min = 0) {
    let range = max - min;
    return range * (this.algorithm.next() / this.algorithm.max) + min;
  }

  /**
   * Generate a random float in the range [-1, 1).
   * @returns {number} - A number between -1 (inclusive) and 1 (exclusive).
   */
  randomBipolarFloat() {
    return this.randomFloat() * 2 - 1;
  }

  /**
   * Generate a random unit vector.
   * @returns {Vector} - A Vector with a magnitude of 1 and a random angle between 0 and TWO_PI.
   */
  randomUnitVector() {
    const angle = this.randomFloat() * Math.PI * 2;
    return Vector.fromAngle(angle);
  }

  /**
   * Generate a random integer from a specified range of values.
   * @param {number} min - The minimum integer value (inclusive).
   * @param {number} max - The maximum integer value (exclusive).
   * @returns {number} - A random integer between min (inclusive) and max (exclusive).
   */
  randomInteger(min, max) {
    const range = max - min;
    return min + Math.floor(this.randomFloat() * range);
  }

  /**
   * Select a random element from an array.
   * @param {array} array - The array from which to select an element.
   * @returns {*} - A randomly selected element from the array.
   */
  randomElement(array) {
    const index = Math.floor(this.randomFloat() * array.length);
    return array[index];
  }

  /**
   * Returns a boolean based on a specified probability.
   * @param {number} [chance=0.5] - The probability of returning true (between 0 and 1).
   * @returns {boolean} - True if the random float is less than the chance, otherwise false.
   */
  randomChance(chance = 0.5) {
    return this.randomFloat() < chance;
  }

  /**
   * Selects an option probabalistically from a set of weighted choices.
   * @param {Array<Object>} choices - An array of objects with `option` and `weight` properties.
   * @param {function|number|string} choices[].option - The outcome of the choice.
   * @param {number} choices[].weight - The weight of the choice. Higher weights (relative to the other choices) increase the likelihood of selection.
   * @returns {function|number|string} - The selected option.
   */
  randomWeighted(choices) {
    let totalWeight = 0;
    for (let choice of choices) {
      totalWeight += choice.weight;
    }

    const randomNumberInRange = this.randomFloat() * totalWeight;
    let cumulativeWeight = 0;
    for (let choice of choices) {
      cumulativeWeight += choice.weight;
      if (randomNumberInRange < cumulativeWeight) {
        if (typeof choice.option === "function") {
          return choice.option();
        }

        return choice.option;
      }
    }
  }
}

/**
 * LCG (Linear Congruential Generator) Pseudorandom Number Generator Class
 * @implements {PRNGAlgorithm}
 *
 * @summary Implements the LCG algorithm to generate pseudorandom numbers.
 * @description
 * This class provides the LCG algorithm for generating psuedorandom
 * numbers to the {@link PRNG} class.
 *
 * @example
 * const rng = new LCG(123456789);
 * console.log(rng.next()); // Generates a pseudorandom number
 *
 * @see https://en.wikipedia.org/wiki/Linear_congruential_generator
 */
export class LCG {
  /**
   * Creates an instance of LCG.
   * @param {number} seed - The seed value for the LCG PRNG.
   */
  constructor(seed) {
    this.modulus = 2 ** 32;
    this.multiplier = 1664525;
    this.increment = 1013904223;
    this.state = seed;
    this.max = this.modulus;
  }

  /**
   * Generates the next pseudorandom number.
   * @returns {number} A number in the range [0 to this.modulus - 1).
   */
  next() {
    this.state = (this.multiplier * this.state + this.increment) % this.modulus;
    return this.state;
  }
}

/**
 * Mulberry32 Pseudorandom Number Generator Class
 * @implements {PRNGAlgorithm}
 * 
 * @summary Implements the Mulberry32 algorithm to generate pseudorandom numbers.
 * @description
 * This class provides the Mulberry32 method of generating psuedorandom
 * numbers to the {@link PRNG} class.
 * 
 * The Mulberry32 algorithm was written by Tommy Ettinger in 2017 and is released to the public domain, meaning it can be freely used, modified, and distributed without restrictions.
 * 
 * @example
 * const rng = new Mulberry32(123456789);
 * console.log(rng.next()); // Generates a pseudorandom number
 * 
 * @see https://gist.github.com/tommyettinger/46a874533244883189143505d203312c

 */
export class Mulberry32 {
  /**
   * Creates an instance of Mulberry32.
   * @param {number} seed - The seed value for the Mulberry32 PRNG.
   */
  constructor(seed) {
    this.state = seed;
    this.max = 2 ** 32;
  }

  /**
   * Generates the next psuedo-random number.
   * @returns {number} A number in the range [0-1).
   *
   * @example
   * // Returns a random number in the range [0-1)
   * const rng = new Mulberry32();
   * console.log(rng.next());
   */
  next() {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    this.state = t ^ (t >>> 14);
    return this.state >>> 0;
  }
}

/**
 * XORShift32 Pseudorandom Number Generator Class
 * @implements {PRNGAlgorithm}
 *
 * @summary Implements the XORShift32 algorithm to generate pseudorandom
 * numbers.
 * @description
 * This class provides the XORShift32 method of generating psuedorandom
 * numbers to the {@link PRNG} class. It uses bitwise operations
 * to generate a sequence of pseudorandom 32-bit unsigned integers.
 *
 * The XORShift algorithm was written by George Marsaglia in 2003 and is
 * released to the public domain, meaning it can be freely used, modified,
 * and distributed without restrictions.
 *
 * @example
 * const prng = new XORShift32(123456789);
 * console.log(prng.next()); // Generates a pseudorandom number
 *
 * @see Marsaglia, G. (2003) "XORShift RNGs", Journal of Statistical
 * Software https://www.jstatsoft.org/article/view/v008i14
 */
export class XORShift32 {
  /**
   * Creates an instance of XORShift32.
   * @param {number} seed - The seed value for the PRNG.
   */
  constructor(seed) {
    this.state = seed;
    this.max = 2 ** 32;
  }

  /**
   * Generates the next psuedo-random number.
   * @returns {number} A number in the range [0-1).
   *
   * @example
   * // Returns a random number in the range [0-1)
   * const rng = new XORShift32();
   * console.log(rng.next());
   */
  next() {
    let a = this.state;
    a ^= a << 13;
    a ^= a >>> 17;
    a ^= a << 5;
    this.state = a >>> 0; // Ensure it stays a 32-bit unsigned integer
    return this.state;
  }
}

/**
 * @summary Create a random hexadecimal string of a specified length.
 * @description Uses Math.random() to make a hexadecimal string for
 * setting the seed of a {@link Plot} to be used in a seedable {@link PRNG} such as {@link LCG}
 * @param {number} n - Number of digits
 * @returns {string} - Hexadecimal string of length n
 */
export function unseededRandomHex(n) {
  const hexArray = Array.from(
    {
      length: n,
    },
    () => {
      return Math.floor(Math.random() * 16).toString(16);
    },
  );
  const hex = hexArray.join("");
  const decimal = parseInt(hex, 16);

  return {
    hex,
    decimal,
  };
}
