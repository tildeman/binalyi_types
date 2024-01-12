/**
 * Converts a `Map` into a normal object without a prototype.
 * @param map The `Map` to convert.
 * @returns An object with all the keys and values of the input `Map`.
 */
export function vomitMap<T>(map: Map<string, T>): Record<string, T> {
	const ret = Object.create(null); // Prevent prototypes
	for (const [key, val] of map) {
		ret[key] = val;
	}
	return ret;
}