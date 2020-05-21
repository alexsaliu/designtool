import {
    MOVING_ELEMENT,
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID
} from '../constants.js';

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
