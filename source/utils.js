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
	const range = max - min;
	return min + Math.floor(randomfn * range);
}

export function randomElement(array, randomfn = Math.random()) {
	const index = Math.floor(randomfn * array.length);
	return array[index];
}

export function sinFract(x, y, a, b, m) {
	return fract(Math.sin(x * a + y * b) * m);
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
	return min + ((input - min + range) % range);
}

/**
 * Linear interpolation between two values
 * @param {number} a
 * @param {number} b
 * @param {number} amount
 */
export function lerp(a, b, amount) {
	return a + (b - a) * amount;
}

/**
 * Re-maps a number from one range to another.
 *
 * @param {number} value - The number to be re-mapped.
 * @param {number} min1 - The minimum value of the original range.
 * @param {number} max1 - The maximum value of the original range.
 * @param {number} min2 - The minimum value of the target range.
 * @param {number} max2 - The maximum value of the target range.
 * @param {boolean} [withinBounds=false] - Whether the remapped value should be constrained within the target range.
 * @returns {number} The re-mapped value.
 */
export function map(value, min1, max1, min2, max2, withinBounds = false) {
	// Re-map the value from the original range to the target range
	let mappedValue = min2 + ((value - min1) / (max1 - min1)) * (max2 - min2);

	// Optionally constrain the remapped value within the target range
	if (withinBounds) {
		mappedValue = Math.min(max2, Math.max(min2, mappedValue));
	}

	return mappedValue;
}

export function randomHex(length) {
	if (length <= 0) return "";

	// Calculate the number of bytes needed (each byte = 2 hex characters)
	const byteLength = Math.ceil(length / 2);
	const randomBytes = new Uint8Array(byteLength);

	// Fill the array with cryptographically secure random values
	crypto.getRandomValues(randomBytes);

	// Convert the random bytes to a hex string
	const hexValue = Array.from(randomBytes)
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");

	// Ensure the hex value matches the specified length
	const truncatedHexValue = hexValue.slice(0, length);

	// Convert the hex string to a decimal value
	let decimalValue;
	const bigIntValue = BigInt("0x" + truncatedHexValue);

	// Check if the value is within the safe integer range
	const maxSafeInteger = BigInt(Number.MAX_SAFE_INTEGER);
	if (bigIntValue <= maxSafeInteger) {
		decimalValue = Number(bigIntValue);
	} else {
		decimalValue = bigIntValue;
	}

	return {
		hex: truncatedHexValue,
		decimal: decimalValue,
	};
}
