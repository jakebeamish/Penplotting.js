/**
 * @class Linear Congruential Generator
 */
export class LCG {
    /**
     * @param {number} [seed=0] 
     */
    constructor(seed = 0) {
        this.seed = seed;
    }

    random() {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return this.seed / 4294967296;
    }
}

export function randomInteger(min, max, randomfn = Math.random()) {
    let range = max - min;
    return min + Math.floor(randomfn * range);
}

export function sinFract(x, y, a, b, m) {
    return fract(Math.sin(x * a + y * b) * m)
}

/**
 * 
 * @param {number} x
 * @returns {number} The fractional part of x
 * @example
 * // returns 0.42
 * fract(1.42)
 * @example
 * // returns 0.77
 * fract(-42.23)
 */
export function fract(x) {
    return x - Math.floor(x);
}

export function wrap(input, min, max) {
    const range = max - min;
    return min + ((input - min) + range) % range
}

/**
 * Linear interpolation between two values
 * @param {number} a
 * @param {number} b
 * @param {number} amount
 */
export function lerp(a, b, amount) {
    return a + ((b - a) * amount);
}