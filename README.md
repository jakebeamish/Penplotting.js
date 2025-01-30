# Penplotting.js

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/jakebeamish/Penplotting.js/node.js.yml?style=flat&label=tests)

Penplotting.js is a JavaScript framework for making generative art in SVG
format for penplotters. This project is a personal project, and as such, it is
a work-in-progress. New features and breaking changes are expected in future
updates. Use at your own discretion, feel free to contribute and raise issues.

## Features

- Shapes and geometry classes: Vector, Point, Line, Path, Circle, AABB, Matrix
- Seedable PRNG implementations with useful methods
- Quadtree for optimised nearest-neighbour search
- Paper sizes

## Installation

```sh
npm i @jakebeamish/penplotting
```

## Usage

To start a new plot, run

```sh
npx new-plot
```

This command runs a shell script that will create boilerplate `index.html`,
`style.css` and `plot.js` files in the current working directory.

Inside `plot.js`, adjust the options for initializing the plot. A full list of
options can be found in the [Plot constructor docs](https://jakebeamish.github.io/Penplotting.js/Plot.html#constructor).

```js
const plot = new Plot({
  units: "mm",
  title: "My amazing plot",
  size: Paper.A5,
  strokeWidth: 0.05,
});
```


The image is defined in a `plot.generate()` function in which Vectors and other
shape objects can be created, manipulated, and added to the SVG document with
`plot.add(shapes)`, where `shapes` is a shape or an array of shapes.

For a complete overview, see the [API Documentation](https://jakebeamish.github.io/Penplotting.js/).

```js
import {
  Plot,
  Vector,
  Triangle,
  Line,
  AABB,
  Circle,
  Path,
  PAPER,
  PRNG,
} from "@jakebeamish/penplotting";

// Setup a new plot with configuration options
let plot = new Plot({
  size: PAPER.A6.landscape(),
  backgroundColor: "white",
  strokeWidth: 0.3,
});

// Create the work inside the plot.generate() function
plot.generate = () => {
  // Initialise PRNG
  const prng = new PRNG({ seed: plot.seed.decimal });

  // Destructure the plot size for easy access to width and height
  const { width, height } = plot.size;

  // The Vector constructor takes up to three parameters x, y, and z
  // If an argument is not given for a coordinate, the default value is 0
  const centre = new Vector(width / 2, height / 2);

  // Lines can be created using the constructor, or the fromArray static method
  // which requires an array in the format [x1, y1, x2, y2]
  const line = Line.fromArray([30, centre.y - 10, 30, centre.y + 10]);

  // Shapes are added to the SVG using plot.add()
  plot.add(line);

  // Circles can be created in a similar way. It requires a position (either as
  // a Vector or as individual coordinates), and a radius
  const circle = Circle.fromVector(new Vector(50, centre.y), 10);

  plot.add(circle);

  const square = new AABB(80, centre.y, 10, 10);

  const triangle = new Triangle(
    new Vector(100, centre.y + 10),
    new Vector(110, centre.y - 10),
    new Vector(120, centre.y + 10)
  );

  // AABBs and Triangles can't be added to a plot directly - the lines() method
  // can be used to return an array of lines that compose the shape
  // plot.add() can be given an (optionally nested) array to add multiple shapes
  plot.add([square.lines(), triangle.lines()]);

  let randomPoints = [];

  for (let i = 0; i < 30; i++) {
    randomPoints.push(
      Vector.lerp(new Vector(30, 20), new Vector(width - 20, 20), i / 30).add(
        new Vector(0, prng.randomBipolarFloat() * 5)
      )
    );
  }

  let randomPath = new Path(randomPoints);

  let sinPoints = [];

  for (let i = 0; i < 100; i++) {
    sinPoints.push(
      Vector.lerp(
        new Vector(30, height - 20),
        new Vector(width - 20, height - 20),
        i / 100
      ).add(new Vector(0, Math.sin((i / 100) * Math.PI * 10) * 3))
    );
  }

  let sinPath = new Path(sinPoints);

  plot.add([randomPath, sinPath]);
};

plot.draw();
```

Calling `plot.draw()` at the end of the file generates an SVG element
and UI inside `index.html`, which can be viewed in a browser.

The above code results in the following output:

![demo screenshot](https://github.com/jakebeamish/Penplotting.js/assets/demo-screenshot.png)

### Keyboard shortcuts

| Action                      | Key |
| --------------------------- | --- |
| Download an SVG file        | `d` |
| Regenerate with random seed | `r` |

### Plotting the SVG files

The SVG file can be downloaded and optionally processed further. Personally, I
use vpype to optimise the file, and then the axidraw Inkscape plugin to control
the plotter.

## Contributing

Contributions are welcome. Issues, comments and Pull Requests can be made at
https://github.com/jakebeamish/penplot-svg-tool/issues.

The project is tested using jest. Documentation is generated using JSDoc.

## License

This project is licensed under the MIT License. See the [LICENSE.md](https://github.com/jakebeamish/Penplotting.js/blob/main/LICENSE.md) file for
details.

## Acknowledgements

This project incorporates code from:

- [CodingTrain/Quadtree](https://github.com/CodingTrain/Quadtree) - Licensed under the MIT License.
