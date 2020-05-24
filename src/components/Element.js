import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    getNumericValue,
    calculateElementNewPosition,
    checkPositionBoundaries,
    getUpdatedElementPosition,
    getUpdatedElementDimensions
 } from '../helpers.js';

import Adjuster from './Adjuster.js';

import {
    movingElement,
    adjustingElement,
    updateElements,
    setSelectedElementId
} from '../store/actions/actions.js';

const Element = ({ id }) => {
    const [highlighted, setHighlighted] = useState(false);
    const [moving, setMoving] = useState(false);
    const [startingPosition, setStartingPosition] = useState([0,0]);
    const [updatedElements, setUpdatedElements] = useState([]);

    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const isMoving = useSelector(state => state.editor.movingElement);
    const isAdjusting = useSelector(state => state.editor.adjustingElement);
    const mousePosition = useSelector(state => state.editor.mousePosition);
    const dispatch = useDispatch();

    useEffect(() => {
        setUpdatedElements([...elements]);
    }, [elements])

    useEffect(() => {
        if (selectedId === id && isMoving) {
            setPosition(mousePosition);
        }
        if (selectedId === id && isAdjusting) {
            setDimensions(mousePosition);
        }
    }, [mousePosition])

    const commenceMovingElement = () => {
        dispatch(setSelectedElementId(id));
        dispatch(movingElement(true));
        setStartingPosition(mousePosition);
    }

    const commenceAdjustingElement = () => {
        dispatch(adjustingElement(true));
        setStartingPosition(mousePosition);
    }

    const setPosition = (currentMousePosition) => {
        let currentElements = getUpdatedElementPosition(elements, id, startingPosition, currentMousePosition);
        setUpdatedElements(currentElements);
    }

    const setDimensions = (currentMousePosition) => {
        let currentElements = getUpdatedElementDimensions(elements, id, {bottom: true}, startingPosition, currentMousePosition);
        setUpdatedElements(currentElements);
    }

    const updateElementPosition = () => {
        if (selectedId !== id || selectedId === id && !isMoving) return;
        dispatch(updateElements(updatedElements));
        dispatch(movingElement(false));
    }

    const updateElementDimensions = () => {
        if (selectedId !== id || selectedId === id && !isAdjusting) return;
        dispatch(updateElements(updatedElements));
        dispatch(adjustingElement(false));
    }

    if (elements[id].type === 'button') {
        return (
            <div
                style={elements[id].style}
                className={selectedId === id ? 'selected' : ''}
                onMouseEnter={() => setHighlighted(true)}
            >

                {selectedId === id || highlighted
                    ? <Adjuster
                        styles={elements[id].style}
                        selected={selectedId === id}
                        setHighlighted={setHighlighted}
                        updateElementPosition={updateElementPosition}
                        commenceMovingElement={commenceMovingElement}
                        updateElementDimensions={updateElementDimensions}
                        commenceAdjustingElement={commenceAdjustingElement}
                    /> : ''
                }

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
