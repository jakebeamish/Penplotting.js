export function wrap(input, min, max) {
    let range = max - min;
    return min + ((input - min) + range) % range
}