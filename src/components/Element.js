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

    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const isMoving = useSelector(state => state.editor.movingElement);
    const mousePosition = useSelector(state => state.editor.mousePosition);
    const dispatch = useDispatch();

    useEffect(() => {
        setUpdatedElements([...elements]);
    }, [elements])

    useEffect(() => {
        if (selectedId === id && isMoving) {
            setPosition(mousePosition);
        }
    }, [mousePosition])

    const commenceMovingElement = () => {
        dispatch(setSelectedElementId(id));
        dispatch(movingElement(true));
        setStartingPosition(mousePosition);
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
        return parseInt(value.match(/-?\d+/)[0]);
    }

    const setPosition = (coords) => {
        let currentElements = [...elements];
        let style = elements[id].style;
        const left = getNumericValue(style.left);
        const top = getNumericValue(style.top);
        const width = getNumericValue(style.width);
        const height = getNumericValue(style.height);

        const currentMousePosition = coords;
        const elementPosition = [left, top];
        const newElementPosition = calculateElementPosition(startingPosition, currentMousePosition, elementPosition);

        let x = checkPositionBoundaries(newElementPosition[0], 0, 800 - width);
        let y = checkPositionBoundaries(newElementPosition[1], 0, 235 - height);

        currentElements[id].style = {...currentElements[id].style, left: `${x}px`, top: `${y}px`};
        setUpdatedElements(currentElements);
    }

    const updateStore = () => {
        if (selectedId !== id || selectedId === id && !isMoving) return;
        dispatch(updateElements(updatedElements));
        dispatch(movingElement(false));
    }

    if (elements[id].type === 'button') {
        return (
            <div
                className={selectedId === id ? 'selected' : ''}
                style={elements[id].style}
                onMouseEnter={() => setHilighted(true)}
                onMouseLeave={() => {setHilighted(false); updateStore()}}
                onMouseDown={() => commenceMovingElement()}
                onMouseUp={() => updateStore()}
            >

            {highlighted && selectedId !== id ? <Highlight styles={elements[id].style} /> : ''}
            {selectedId === id ? <Adjuster styles={elements[id].style} /> : ''}

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
