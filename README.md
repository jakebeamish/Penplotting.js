# Penplotting.js

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/jakebeamish/Penplotting.js/node.js.yml?style=flat&label=tests)

Penplotting.js is a JavaScript framework for making generative art in SVG format for penplotters.
This project is a personal project, and as such, it is a work-in-progress. New 
features and breaking changes are to be expected in future updates. Use at your
own discretion, feel free to contribute and raise issues.

## Features

- Shapes and geometry classes: 2D Vector, Line, Path, Circle, AABB
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
This is a shell script that will create new default `index.html`,
`style.css` and `plot.js` files in the current working directory.
Inside `plot.js`, adjust the options for initializing the plot:

```js
const plot = new Plot({
    units: "mm",
    title: "My amazing plot",
    size: Paper.A5,
    strokeWidth: 0.05
});
```

The image is defined in a plot.generate() function in which Vector,
Line and Circle objects can be created and manipulated, and added to
the SVG document using `plot.add(shapes)`.

```js
// This is where the work is made
plot.generate = () => {
    // Create Lines from Vectors
    const a = new Vector(10, 10);
    const b = new Vector(90, 90);
    const line = new Line(a, b);

    // Add shapes to the Plot
    plot.add(line);
}

plot.draw();
```

Calling `plot.draw()` at the end of the file will generate an SVG element
and UI inside `index.html`, which can be opened in a browser.

### Keyboard shortcuts
| Action                     | Key |
|----------------------------|----|
|Download an SVG file        | `d`   |
|Regenerate with random seed | `r`   |

### Plotting the SVG files

The SVG file can be downloaded and optionally processed further.
Personally, I use vpype to optimise the file, and then the axidraw Inkscape plugin to control the plotter.

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

