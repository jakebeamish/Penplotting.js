import { hexToDec } from "../../utils";

test("hexToDec() should return integer numbers", () => {
    const hex = "FFF";
    expect(typeof hexToDec(hex)).toBe("number")
})