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

export function fract(x) {
    return x - Math.floor(x);
}