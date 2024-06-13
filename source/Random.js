/**
 * Class representing a Psuedo Random Number Generator.
 * @abstract
 */
class PRNG {
    /**
     * @hideconstructor
     * @param {number} [seed=Date.now()] 
     */
    constructor(seed = Date.now()) {
        this.seed = seed;
    }

    maxValue() {
        throw new Error("Method maxValue() must be implemented.")
    }

    next() {
        throw new Error("Method next() must be implemented.")
    }

    /**
     * Generates a random float (in the range (0, 1]?)
     * @returns {number} A number between 0 and 1
     */
    randomFloat() {
        return this.next() / this.maxValue();
    }

    /**
     * Generates a random integer from a specified range of values
     * @param {number} min - The minimum integer value 
     * @param {number} max - The maximum integer value
     * @returns {number} - A random integer in the given range
     */
    randomInteger(min, max) {
        const range = max - min;
        return min + Math.floor(this.randomFloat() * range);
    }

    /**
     * Selects a random element from an array
     * @param {array} array - The array from which to select an element
     * @returns {*} - A randomly selected element from the given array
     */
    randomElement(array) {
        const index = Math.floor(this.randomFloat() * array.length);
        return array[index];
    }
}

/**
 * Class representing a Linear Congruential Generator
 * @extends PRNG
 */
export class LCG extends PRNG {
    /**
     * Create an LCG.
     * @param {number} seed - The seed number.
     */
    constructor(seed) {
        super(seed);
        this.modulus = 2 ** 32;
        this.multiplier = 1664525;
        this.increment = 1013904223;
        this.state = this.seed;
    }

    next() {
        this.state = (this.multiplier * this.state + this.increment) % this.modulus;
        return this.state;
    }

    maxValue() {
        return this.modulus;
    }
}
