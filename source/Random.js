/**
 * @summary Class representing a Psuedo Random Number Generator.
 * @abstract
 * @description This class shouldn't be instantiated directly.
 * It is extended by {@link LCG}.
 */
export class PRNG {
    /**
     * 
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
     * Generate a random float (in the range (0, 1]?)
     * @returns {number} A number between 0 and 1
     */
    randomFloat() {
        return this.next() / this.maxValue();
    }

    /**
     * Generate a random float in the range (-1, 1]
     * @returns {number} A number between -1 and 1
     */
    randomBipolarFloat() {
        return this.randomFloat() * 2 - 1
    }

    /**
     * Generate a random integer from a specified range of values.
     * @param {number} min - The minimum integer value.
     * @param {number} max - The maximum integer value.
     * @returns {number} - A random integer in the given range.
     */
    randomInteger(min, max) {
        const range = max - min;
        return min + Math.floor(this.randomFloat() * range);
    }

    /**
     * Select a random element from an array.
     * @param {array} array - The array from which to select an element.
     * @returns {*} - A randomly selected element from the given array.
     */
    randomElement(array) {
        const index = Math.floor(this.randomFloat() * array.length);
        return array[index];
    }

    randomChance(chance) {
        return this.randomFloat() < chance;
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

export class Mulberry32 extends PRNG {
    constructor(seed) {
        super(seed);
        this.state = this.seed;
    }

    maxValue() {
        return 2 ** 32;
    }

    next() {
        let t = this.state += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, 1 | t);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        this.state = t ^ t >>> 14;
        return this.state >>> 0;
    }
}

export class XORShift32 extends PRNG {
    constructor(seed) {
        super(seed);
        this.state = this.seed;
    }

    maxValue() {
        return 2 ** 32;
    }

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
 * setting the seed of a {@link Sketch} to be used in a seedable {@link PRNG} such as {@link LCG}
 * @param {number} n - Number of digits 
 * @returns {string} - Hexadecimal string of length n
 */
export function unseededRandomHex(n) {
    const hexArray = Array.from({
        length: n
    }, () => {
        return Math.floor(Math.random() * 16).toString(16)
    });
    const hex = hexArray.join("");
    const decimal = parseInt(hex, 16);

    return {
        hex, decimal
    }
}
