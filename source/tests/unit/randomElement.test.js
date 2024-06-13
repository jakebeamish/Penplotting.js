import { LCG } from "../../Random";

test("randomElement(array) should return an element from the array", () => {
    const lcg = new LCG();

    const array = ["beer", "wine", "juice"];

    const element = lcg.randomElement(array);

    expect(array).toContain(element);
})