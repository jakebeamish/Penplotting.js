export function addPathToSVG(svg, points, {
    stroke = "black",
    fill = "transparent",
    strokeWidth = 0.2
} = {}) {

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    let commandString = "";

    commandString += `M ${points[0].x} ${points[0].y} `
    for (let i = 1; i < points.length; i++) {
        commandString += `L ${points[i].x} ${points[i].y} `
    }

    path.setAttribute("d", commandString)
    path.setAttribute("stroke", stroke);
    path.setAttribute("stroke-width", strokeWidth);
    path.setAttribute("fill", fill);

    svg.appendChild(path);
    return svg;
}