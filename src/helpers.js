// Get numeric value found in a string
export const getNumericValue = (value) => {
    return parseInt(value.match(/-?\d+/)[0]);
}

const calculateMousePositionChanges = (startMouse, currentMouse) => {
    const xChange = currentMouse[0] - startMouse[0];
    const yChange = currentMouse[1] - startMouse[1];
    return [xChange, yChange];
}

// MOVING ELEMENT POSITION
// Calculate the x,y left/top position changes
const calculateElementNewPosition = (mouseChanges, elementPosition) => {
    const newPosition = [elementPosition[0] + mouseChanges[0], elementPosition[1] + mouseChanges[1]];
    return newPosition;
}
// Keep element within set boundaries
const checkPositionBoundaries = (position, min, max) => {
    if (position < min) return min;
    if (position > max) return max;
    return position;
}
// Get new styles for elements new position
export const getUpdatedElementPosition = (elements, id, startMouse, currentMouse) => {
    let currentElements = [...elements];
    let style = elements[id].style;

    const left = getNumericValue(style.left);
    const top = getNumericValue(style.top);
    const width = getNumericValue(style.width);
    const height = getNumericValue(style.height);

    const elementPosition = [left, top];
    const mouseChanges = calculateMousePositionChanges(startMouse, currentMouse);
    const newElementPosition = calculateElementNewPosition(mouseChanges, elementPosition);

    let x = checkPositionBoundaries(newElementPosition[0], 0, 800 - width);
    let y = checkPositionBoundaries(newElementPosition[1], 0, 235 - height);

    currentElements[id].style = {...currentElements[id].style, left: `${x}px`, top: `${y}px`};
    return currentElements;
}

// CHANGING ELEMENT DIMENSIONS
// Get new width from dragging right adjuster
export const getUpdatedElementDimensions = (elements, id, dimensions, startMouse, currentMouse) => {
    let currentElements = [...elements];
    let style = elements[id].style;

    let left = getNumericValue(style.left);
    let top = getNumericValue(style.top);
    let width = getNumericValue(style.width);
    let height = getNumericValue(style.height);

    const elementPosition = [left, top];
    const mouseChanges = calculateMousePositionChanges(startMouse, currentMouse);
    const newElementPosition = calculateElementNewPosition(mouseChanges, elementPosition);

    if (dimensions.left) {
        width = mouseChanges[0];
        left = newElementPosition[0];
    }
    if (dimensions.top) {
        height = mouseChanges[1];
        top = newElementPosition[1];
    }
    if (dimensions.right) {
        width = mouseChanges[0];
    }
    if (dimensions.bottom) {
        height = mouseChanges[1];
    }

    currentElements[id].style = {
        ...currentElements[id].style,
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
    };

    return currentElements;
}
