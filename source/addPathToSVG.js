export function addPathToSVG(svg, path, {
    stroke = "black",
    fill = "transparent",
    strokeWidth = 0.1,
} = {}) {

    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");

    let commandString = "";

    commandString += `M ${path.points[0].x} ${path.points[0].y} `
    for (let i = 1; i < path.points.length; i++) {
        commandString += `L ${path.points[i].x} ${path.points[i].y} `
    }

    if (path.isClosed) {
        commandString += "Z";
    }

    pathElement.setAttribute("d", commandString)
    pathElement.setAttribute("stroke", stroke);
    pathElement.setAttribute("stroke-width", strokeWidth);
    pathElement.setAttribute("fill", fill);

    svg.appendChild(pathElement);
    return svg;
}