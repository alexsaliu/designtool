import {
    SET_MOUSE_POSITION,
    MOVING_ELEMENT,
    ADJUSTING_ELEMENT,
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
    SET_ADJUSTING_DIMENSIONS,
    SET_UPDATE_CANVAS
} from '../constants.js';

const initialState = {
    canvasSize: [800, 235],
    mousePosition: [0,0],
    movingElement: false,
    adjustingElement: false,
    elements: [],
    selectedElementId: -1,
    adjustingDimensions: {},
    updateCanvas: false
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
        case SET_ADJUSTING_DIMENSIONS:
            return {...state, adjustingDimensions: action.payload};
        case SET_UPDATE_CANVAS:
            return {...state, updateCanvas: action.payload};
        default:
            return state;
    }
}
