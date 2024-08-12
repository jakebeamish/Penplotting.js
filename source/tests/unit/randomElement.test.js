import { XORShift32 } from "../../Random";

test("randomElement(array) should return an element from the array", () => {
    const prng = new XORShift32();

    const array = ["beer", "wine", "juice"];

    const element = prng.randomElement(array);

    expect(array).toContain(element);
})