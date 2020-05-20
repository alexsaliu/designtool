import {
    ADD_ELEMENT
} from '../constants.js';

const initialState = {
    elements: [{element: "one"}]
}

export const editorReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_ELEMENT:
            return {...state, elements: action.payload};
        default:
            return state;
    }
}
