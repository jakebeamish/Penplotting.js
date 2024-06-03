import { deduplicateObjectArray } from "../../deduplicateObjectArray.js";
import { Vector } from "../../Vector.js";

describe('Deduplicate Object Array function', () => {
    test('It returns an array of unique vectors', () => {

        let original = [
            new Vector(0,0),
            new Vector(1,1),
            new Vector(1,1),
        ]

        let unique = [
            new Vector(0,0),
            new Vector(1,1)
        ]

        let result = deduplicateObjectArray(original);
        expect(result.length).toBe(unique.length)
    })
})