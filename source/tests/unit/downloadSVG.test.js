import { Sketch } from "../../Sketch";

test("Sketch downloadSVG method", () => {
	// Instantiate the Sketch class
	const sketch = new Sketch(100, 100, {
		seed: 1
	}
	);

	// Mock methods
	const createObjectURLMock = jest.fn(() => "mock-url");
	const revokeObjectURLMock = jest.fn();
	const appendChildMock = jest
		.spyOn(document.body, "appendChild")
		.mockImplementation(() => { });
	const removeChildMock = jest
		.spyOn(document.body, "removeChild")
		.mockImplementation(() => { });

	global.URL.createObjectURL = createObjectURLMock;
	global.URL.revokeObjectURL = revokeObjectURLMock;

	// Call the downloadSVG method
	sketch.downloadSVG("test.svg");

	// Check that the serializer and Blob were called correctly
	expect(createObjectURLMock).toHaveBeenCalledTimes(1);
	expect(revokeObjectURLMock).toHaveBeenCalledTimes(1);
	expect(appendChildMock).toHaveBeenCalledTimes(1);
	expect(removeChildMock).toHaveBeenCalledTimes(1);

	// Check that the <a> element was created and clicked
	const aElement = document.body.appendChild.mock.calls[0][0];
	expect(aElement.tagName).toBe("A");

	// Use URL.createObjectURL to generate the expected absolute URL
	const expectedHref = new URL("mock-url", document.location).href;
	expect(aElement.href).toBe(expectedHref);
	// expect(aElement.download).toBe(sketch.filename());

	// Clean up mocks
	appendChildMock.mockRestore();
	removeChildMock.mockRestore();
	global.URL.createObjectURL = createObjectURLMock.mockRestore();
	global.URL.revokeObjectURL = revokeObjectURLMock.mockRestore();
});
