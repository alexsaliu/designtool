import {
    SET_MOUSE_POSITION,
    MOVING_ELEMENT,
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
    SET_ADJUSTING_DIMENSIONS,
    SET_UPDATE_CANVAS
} from '../constants.js';

export const setMousePosition = (coords) => {
    return {
        type: SET_MOUSE_POSITION,
        payload: coords,
    }
}

export const movingElement = (bool) => {
    return {
        type: MOVING_ELEMENT,
        payload: bool,
    }
}

export const updateElements = (elements) => {
    return {
        type: UPDATE_ELEMENTS,
        payload: elements,
    }
}

export const setSelectedElementId = (id) => {
    return {
        type: SET_SELECTED_ELEMENT_ID,
        payload: id,
    }
}

export const setAdjustingDimensions = (dimensions) => {
    return {
        type: SET_ADJUSTING_DIMENSIONS,
        payload: dimensions,
    }
}

export const setUpdateCanvas = (bool) => {
    return {
        type: SET_UPDATE_CANVAS,
        payload: bool,
    }
}
