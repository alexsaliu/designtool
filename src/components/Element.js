import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Highlight from './Highlight.js';
import Adjuster from './Adjuster.js';

import {
    movingElement,
    updateElements,
    setSelectedElementId
} from '../store/actions/actions.js';

const Element = ({ id }) => {
    const [highlighted, setHilighted] = useState(false);
    const [moving, setMoving] = useState(false);
    const [startingPosition, setStartingPosition] = useState([0,0]);
    const [updatedElements, setUpdatedElements] = useState([]);

    const state = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const isMoving = useSelector(state => state.editor.movingElement);
    const dispatch = useDispatch();

    useEffect(() => {
        setUpdatedElements([...state]);
        console.log(state);
    }, [state])

    const commenceMovingElement = (e) => {
        setStartingPosition(getMouseCoords(e));
        dispatch(setSelectedElementId(id));
        dispatch(movingElement(true));
    }

    const getMouseCoords = (e) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        return [x,y];
    }

    const calculateElementPosition = (startMouse, currentMouse, elementPosition) => {
        const xChange = currentMouse[0] - startMouse[0];
        const yChange = currentMouse[1] - startMouse[1];
        const newPosition = [elementPosition[0] + xChange, elementPosition[1] + yChange];
        return newPosition;
    }

    const checkPositionBoundaries = (position, min, max) => {
        if (position < min) return min;
        if (position > max) return max;
        return position;
    }

    const getNumericValue = (value) => {
        return parseInt(value.match(/\d+/)[0]);
    }

    const setPosition = (e) => {
        if (!isMoving) return;
        let elements = [...state];
        let style = state[id].style;
        const left = getNumericValue(style.left);
        const top = getNumericValue(style.top);
        const width = getNumericValue(style.width);
        const height = getNumericValue(style.height);

        const currentMousePosition = getMouseCoords(e);
        const elementPosition = [left, top];
        const newElementPosition = calculateElementPosition(startingPosition, currentMousePosition, elementPosition);

        let x = checkPositionBoundaries(newElementPosition[0], 0, 800 - width);
        let y = checkPositionBoundaries(newElementPosition[1], 0, 235 - height);

        elements[id].style = {...elements[id].style, left: `${x}px`, top: `${y}px`};
        setUpdatedElements(elements);
    }

    const updateStore = () => {
        if (selectedId !== id || selectedId === id && !isMoving) return;
        console.log("YOU DOG: ", updatedElements);
        dispatch(updateElements(updatedElements));
        dispatch(movingElement(false));
    }

    if (state[id].type === 'button') {
        return (
            <div
            className={selectedId === id ? 'selected' : ''}
            style={state[id].style}
            onMouseEnter={() => setHilighted(true)}
            onMouseLeave={() => {setHilighted(false); updateStore()}}
            onMouseDown={(e) => commenceMovingElement(e)}
            onMouseUp={() => updateStore()}
            onMouseMove={(e) => {setPosition(e)}}
            >

            {highlighted && selectedId !== id ? <Highlight styles={state[id].style} /> : ''}
            {selectedId === id ? <Adjuster styles={state[id].style} /> : ''}

            </div>
        );
    }
    else {
        return (
            <div>Trash</div>
        )
    }
}

export default Element;
