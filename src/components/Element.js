import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Adjuster from './Adjuster.js';

import {
    getNumericValue,
    calculateElementNewPosition,
    checkPositionBoundaries,
    getUpdatedElementPosition,
    getUpdatedElementDimensions
 } from '../helpers.js';

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
    const [startingElementStyles, setStartingElementStyles] = useState({});
    const [adjustingDimensions, setAdjustingDimensions] = useState({});
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
        if (selectedId === id && (isMoving || isAdjusting)) {
            setPosition(mousePosition);
        }
    }, [mousePosition])

    const commenceMovingElement = (dimensions) => {
        setStartingPosition(mousePosition);
        setStartingElementStyles({...elements[id].style});
        setAdjustingDimensions(dimensions);
        dispatch(dimensions ? adjustingElement(true) : movingElement(true));
        dispatch(setSelectedElementId(id));
    }

    const setPosition = (currentMousePosition) => {
        let currentElements = getUpdatedElementPosition(elements, id, startingElementStyles, startingPosition, currentMousePosition, adjustingDimensions);
        setUpdatedElements(currentElements);
    }

    const updateElementPosition = (type) => {
        if (selectedId === id && isMoving) {
            dispatch(updateElements(updatedElements));
            dispatch(movingElement(false));
        }
        else if (selectedId === id && isAdjusting) {
            dispatch(updateElements(updatedElements));
            dispatch(adjustingElement(false));
        }
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
