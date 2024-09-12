#!/bin/bash

# Define HTML content
html_content='<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Penplotting.js</title>
  <script type="importmap">
    {
      "imports": {
        "@jakebeamish/penplotting": "/node_modules/@jakebeamish/penplotting/source/index.js"
      }
    }
    </script>
  <script type="module" src="./plot.js"></script>
  <link rel="stylesheet" href="style.css">
</head>

<body>
</body>

</html>'

# Define CSS content
css_content='body {
    width: 100%;
    height: 100%;
    background-color: black;
}

header {
    display: block;
    text-align: center;
    color: white;
    padding-bottom: 0.5rem;
}


header h1,
header form,
header form select,
header input,
header nav,
header nav ul,
header nav ul li,
header div,
header div p {
    display: inline;
    font-family: "Courier New", Courier, monospace;
    margin-left: 0.2rem;
    font-size: medium;
}

header input {
    color: white;
    background-color: black;
    font-size: medium;
    font-weight: bold;
    border: none;
}

header form select {
    padding-right: 0px;
    margin: 0px;
    display: inline;
}

header nav ul li {
    margin-right: 0.2rem;
    padding: 0.2rem 0.2rem 0rem 0.2rem;
    cursor: pointer;
    border-radius: 3px 3px;
    border: 1px solid white;
    font-weight: 400;
}

header nav ul li:hover {
    color: black;
    background-color: white;
}


svg {
    margin: auto;
    display: block;
    filter: drop-shadow(0px 0px 3px white);
}'

# Define js content
js_content='import { Plot, Vector, Line, AABB, Circle, Path, PAPER, XORShift32, map } from "@jakebeamish/penplotting";

let plot = new Plot({
    size: PAPER.A4.portrait(),
    backgroundColor: "white",
    strokeWidth: 0.1,
});

plot.generate = () => {
    const prng = new XORShift32(plot.seed.decimal);
    const { width, height } = plot.size;
    const centre = new Vector(width / 2, height / 2);
    const margin = width * 0.15;

}

plot.draw();
'

# Write HTML content to index.html
echo "$html_content" > index.html
echo "Generated index.html"

# Write CSS content to style.css
echo "$css_content" > style.css
echo "Generated style.css"

echo "$js_content" > plot.js
echo "Generated plot.js"
