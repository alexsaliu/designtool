import {
    SET_MOUSE_POSITION,
    MOVING_ELEMENT,
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
} from '../constants.js';

const initialState = {
    bannerSize: [800, 235],
    mousePosition: [0,0],
    movingElement: false,
    elements: [],
    selectedElementId: -1,
}

export const editorReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_MOUSE_POSITION:
            return {...state, mousePosition: action.payload};
        case MOVING_ELEMENT:
            return {...state, movingElement: action.payload};
        case UPDATE_ELEMENTS:
            return {...state, elements: action.payload};
        case SET_SELECTED_ELEMENT_ID:
            return {...state, selectedElementId: action.payload};
        default:
            return state;
    }
}
