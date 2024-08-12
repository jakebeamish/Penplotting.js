import { decToHex } from "../../utils";

describe("The decToHex function", () => {

    test("converts 5 into '5' when length is set to 1", () => {
        expect(decToHex(5, 1)).toBe("5");
    });

    test("converts 5 into '005' when length is set to 3", () => {
        expect(decToHex(5, 3)).toBe("005");
    });

    test("converts 2863311530 into 'aaaaaaaa'", () => {
        expect(decToHex(2863311530)).toBe("aaaaaaaa")
    })
})