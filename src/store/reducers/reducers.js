import {
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
} from '../constants.js';

const initialState = {
    elements: [],
    selectedElementId: -1,
}

export const editorReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_ELEMENTS:
            return {...state, elements: action.payload};
        case SET_SELECTED_ELEMENT_ID:
            return {...state, selectedElementId: action.payload};
        default:
            return state;
    }
}
