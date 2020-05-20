import {
    ADD_ELEMENT
} from './constants.js';

export const addElement = (element) => {
    return {
        type: "ADD_ELEMENT",
        payload: element,
    }
}
