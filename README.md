This is a dependency-free JavaScript framework for making SVG files for penplotters.

## Features

- A Sketch class to contain everything needed to create and render the SVG
- Geometry classes:
  - 2D Vector
  - Line
  - Path
  - Circle
- Seedable PRNGs with useful methods (Mulberry32, XORShift32, LCG)
- Helpful functions such as vector maths, nearestNeighbour, fract, wrap, lerp, map
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
    strokeWeight: 0.05
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

## Roadmap

TODO:
- Test plans
- Tutorials using JSDoc
- Examples using JSdoc
- Line line intersection
- Units conversion
- SVG output validation
- HTML GUI for changing params
- 3D support
- Noise functions
- Batch create and download
- Voronoi diagrams
- Grid class
- Download the code (the sketch.generate() function or the whole Sketch object)
- randomWeighted
- Is this vector on this line (or, does this line contain this vector?) -> Is this line a subset of a larger line (if so, don't draw it)
- Do these lines overlap? If so, remove them and add a new composite line

## Contributing

Currently, I am using `jest` and `jest-cucumber` for testing. Some scenarios are described in feature files, but the majority of tests are not.

I'm trying to make sure that everything in the library is well documented using `JSDoc`.
