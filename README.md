# Penplotting.js

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/jakebeamish/Penplotting.js/node.js.yml?style=flat&label=tests)

Penplotting.js is a dependency-free JavaScript framework for making generative art in SVG format for penplotters.

> [!NOTE]
> This is a work in progress, and is likely to change in future updates.

## Features

- A Sketch class to contain everything needed to create and render the SVG
- Shapes and geometry classes: 2D Vector, Line, Path, Circle, Rectangle
- Seedable PRNG implementations with useful methods
- Quadtree for optimised nearest-neighbour search
- Paper sizes

## Installation

```sh
npm i @jakebeamish/penplotting
```

## Usage

To start a new sketch, run
```sh
npx new-plot
```
This will create new default `index.html`, `style.css` and `sketch.js` files.

Inside `sketch.js`, adjust the options for initializing the sketch:

```js
const sketch = new Sketch({
    units: "mm",
    title: "My amazing sketch",
    size: Paper.A5,
    strokeWidth: 0.05
});
```

Define a sketch.generate() function, in which Vectors, Lines and other shapes can be created, manipulated, and added to the SVG document using `sketch.add(shapes)`.

```js
// Define a generate() function
// This is where the work is made
sketch.generate = () => {
    // Create Lines from Vectors
    const a = new Vector(10, 10);
    const b = new Vector(90, 90);
    const l = new Line(a, b);

    // Add shapes to the Sketch
    sketch.add(line);
}
```

Calling `sketch.draw()` at the end of the file will generate an SVG element and UI inside `index.html`, which can be viewed from a browser,
Using something like the Live Server Extension for VS Code.

### Keyboard shortcuts
| Action | Key |
|-|-|
|Download an SVG file|`d`|
|Regenerate with random seed|`r`|

### Plotting the SVG files

The SVG file can be downloaded and optionally processed further.
Personally, I use vpype to optimise the file, and then the axidraw Inkscape plugin to control the plotter.

## Contributing

Contributions are welcome. Issues, comments and Pull Requests can be made at 
https://github.com/jakebeamish/penplot-svg-tool/issues.

Currently, `jest` and `jest-cucumber` are used for testing.
Some scenarios are described in feature files, but the majority of tests are not.

Documentation is generated using JSDoc.
