/**
 * Removes duplicate objects (objects with identical properties and values) from an array.
 * Used to [deduplicate lines in a Sketch]{@link Sketch#deduplicateLines}.
 * @param {array} array An array of objects
 * @returns An array of unique objects
 */
export function deduplicateObjectArray(array) {
	return [...new Set(array.map((o) => JSON.stringify(o)))].map((s) =>
		JSON.parse(s),
	);
}
