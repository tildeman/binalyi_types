/**
 * Converts all the alphabetic characters in a string to uppercase, this time using extra TypeScript features.
 * @param str The string to convert.
 * @returns The string in uppercase.
 */
export function toUpperCase<T extends string>(str: T): Uppercase<T> {
    return str.toUpperCase() as Uppercase<T>;
}