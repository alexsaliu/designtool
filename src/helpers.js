// Get numeric value found in a string
export const getNumericValue = (value) => {
    if (!value) return value;
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

// Keep element within set boundaries
const checkSizeBoundaries = (position, size, min, max) => {
    if (position + size < min) return min;
    if (position + size > max) return max - position;
    return size;
}
// Get new styles for elements new position
export const getUpdatedElementPosition = (elements, id, startingElementStyles, startMouse, currentMouse, dimensions, canvasSize) => {
    let currentElements = [...elements];

    let left = getNumericValue(startingElementStyles.left);
    let top = getNumericValue(startingElementStyles.top);
    let width = getNumericValue(startingElementStyles.width);
    let height = getNumericValue(startingElementStyles.height);

    const mouseChanges = calculateMousePositionChanges(startMouse, currentMouse);
    const elementPosition = [left, top];
    const newElementPosition = calculateElementNewPosition(mouseChanges, elementPosition);

    if (dimensions.left) {
        left = checkPositionBoundaries(newElementPosition[0], 0, canvasSize[0] - width);
    }
    if (dimensions.top) {
        top = checkPositionBoundaries(newElementPosition[1], 0, canvasSize[1] - height);
    }
    if (dimensions.width) {
        width = dimensions.left ? width - mouseChanges[0] : checkSizeBoundaries(left, width + mouseChanges[0], 0, canvasSize[0]);
    }
    if (dimensions.height) {
        height = dimensions.top ? height - mouseChanges[1] : checkSizeBoundaries(top, height + mouseChanges[1], 0, canvasSize[1]);
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
