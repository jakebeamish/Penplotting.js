export function randomInteger(min, max, randomfn = Math.random()) {
    let range = max - min;
    return min + Math.floor(randomfn * range);
}