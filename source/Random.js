export class PRNG {
    constructor(seed = Date.now()) {
        this.seed = seed;
    }

    maxValue() {
        throw new Error("Method maxValue() must be implemented.")
    }

    next() {
        throw new Error("Method next() must be implemented.")
    }

    randomFloat() {
        return this.next() / this.maxValue();
    }

    randomInteger(min, max) {
        const range = max - min;
        return min + Math.floor(this.randomFloat() * range);
    }

    randomElement(array) {
        const index = Math.floor(this.randomFloat() * array.length);
        return array[index];
    }
}

export class LCG extends PRNG {
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
