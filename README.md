This is a dependency-free JavaScript framework for making SVG files for penplotters.

## Features

- A Sketch class to contain everything needed to create and render the SVG
- Shapes and geometry classes: 2D Vector, Line, Path, Circle, Rectangle
- Seedable PRNG implementations with useful methods
- Quadtree
- Paper sizes

## Usage

The way I'm using this framework currently is something like this:

1. Create a new Sketch (with optional parameters for dimensions, units, background colour, title, seed)
2. Create and manipulate Vectors and Lines by defining a sketch.generate() function
3. Add Lines to be included as SVG elements in the Sketch by calling `sketch.add()`, and passing in a Line or array of Lines.
4. Call the Sketch's instance method `draw()`

```js
import { Sketch, PAPER, Vector, Line, LCG } from "../../index.js"

// Setup the sketch
const sketch = new Sketch({
    units: "mm",
    title: "My amazing sketch",
    size: Paper.A5,
    strokeWidth: 0.05
});

// Define a generate() function
// This is where the work is made
sketch.generate = () => {
    // Create Lines from Vectors
    const a = new Vector(10, 10);
    const b = new Vector(90, 90);
    const l = new Line(a, b);

    // Add Lines to the Sketch object's lines array
    sketch.add(line);
}

// Call draw() on the Sketch
sketch.draw();
```

### Keyboard shortcuts
| Action | Key |
|-|-|
|Download an SVG file|`d`|
|Regenerate with random seed|`r`|

## Contributing

This is a personal project and is in part a learning exercise, but contributions are welcome. Currently, I am using `jest` and `jest-cucumber` for testing. Some scenarios are described in feature files, but the majority of tests are not.

I'm trying to make sure that everything in the library is well documented using `JSDoc`.
