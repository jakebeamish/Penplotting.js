This is a dependency-free JavaScript framework for making SVG files for penplotters.

## Features

- A Sketch class to contain everything needed to create and render the SVG
- 2D Vector class for geometry
- Line class for drawing lines
- A seedable PRNG
- Maths functions such as fract, wrap, lerp, map

## Usage

The way I'm using this framework currently is something like this:

```js
let sketch = new Sketch();
let line = new Line(
	new Vector(100, 0),
	new Vector(0, 100)
);

sketch.lines.push(line);
sketch.draw();
```

1. Create a new Sketch (with optional parameters for dimensions, units and background colour)
2. Create and manipulate Vectors and Lines
3. Add Lines to the Sketch by pushing Lines to the Sketch's `lines` array
4. Call the Sketch's instance method `draw()`

## Roadmap

TODO:
- More PRNG implementations
- Units conversion
- Support for SVG paths
- SVG output validation
- HTML GUI (reseed, change params, download)
- Keyboard shortcuts
- 3D support
- Noise functions
- Batch create and download

## Contributing

Currently, I am using `jest` and `jest-cucumber` for testing. Some scenarios are described in feature files, but the majority of tests are not.

I'm trying to make sure that everything in the library is well documented using `JSDoc`.

I am also trying out Biome.js for formatting.