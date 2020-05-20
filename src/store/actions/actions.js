import {
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID
} from '../constants.js';

export const updateElements = (elements) => {
    return {
        type: UPDATE_ELEMENTS,
        payload: elements,
    }
}

export const setSelectedElementId = (element) => {
    return {
        type: SET_SELECTED_ELEMENT_ID,
        payload: element,
    }
}
