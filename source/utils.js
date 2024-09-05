/**
 * Generates pseudo-random numbers from `x` and `y` co-ordinates. This
 * technique is adapted from The Art of Code's YouTube video on value noise.
 *
 * @see https://www.youtube.com/watch?v=zXsWftRdsvU
 * 
 * @returns {number} - A floating point number between 0 and 1
 */
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

/**
 * Constrain an input number to within a specified range, and wrapping it around to min when it exceeds max (and vice versa)
 */
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

/**
 * @description Convert a hexadecimal string to a decimal number.
 * @param {string} hex - A hexacimal string.
 * @returns {number} - The decimal equivalent of the hex string.
 */
export function hexToDec(hex) {
	return parseInt(hex, 16);
}

/**
 * @description Convert a decimal number into a hexadecimal string.
 * @param {number} dec - A decimal number.
 * @param {number} [length=8] - The number of digits the string should be padded to.
 * @returns {string} - The hexadecimal string equivalent of the decimal number.
 */
export function decToHex(dec, length = 8) {
	return dec.toString(16).padStart(length, "0");
}
