import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Adjuster from './Adjuster.js';

import {
    getNumericValue,
    calculateElementNewPosition,
    getUpdatedElementPosition,
    getUpdatedElementDimensions
 } from '../helpers.js';

import {
    movingElement,
    updateElements,
    setSelectedElementId,
    setAdjustingDimensions,
    setUpdateCanvas
} from '../store/actions/actions.js';

const Element = ({ id }) => {
    const [highlighted, setHighlighted] = useState(false);
    const [moving, setMoving] = useState(false);
    const [startingPosition, setStartingPosition] = useState([0,0]);
    const [startingElementStyles, setStartingElementStyles] = useState({});
    const [updatedElements, setUpdatedElements] = useState([]);

    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const isMoving = useSelector(state => state.editor.movingElement);
    const mousePosition = useSelector(state => state.editor.mousePosition);
    const adjustingDimensions = useSelector(state => state.editor.adjustingDimensions);
    const updateCanvas = useSelector(state => state.editor.updateCanvas);
    const canvasSize = useSelector(state => state.editor.canvasSize);
    const dispatch = useDispatch();

    useEffect(() => {
        setUpdatedElements([...elements]);
    }, [elements])

    useEffect(() => {
        if (selectedId === id && isMoving) {
            setPosition(mousePosition);
        }
    }, [mousePosition])

    useEffect(() => {
        if (selectedId === id && updateCanvas) {
            updateElementPosition();
        }
    }, [updateCanvas])

    const commenceMovingElement = (dimensions) => {
        setStartingPosition(mousePosition);
        setStartingElementStyles({...elements[id].style});
        dispatch(movingElement(true));
        dispatch(setSelectedElementId(id));
        console.log("ID: ", id);
        dispatch(setAdjustingDimensions(dimensions));
    }

    const setPosition = (currentMousePosition) => {
        let currentElements = getUpdatedElementPosition(elements, id, startingElementStyles, startingPosition, currentMousePosition, adjustingDimensions, canvasSize);
        setUpdatedElements(currentElements);
    }

    const updateElementPosition = () => {
        dispatch(updateElements(updatedElements));
        dispatch(movingElement(false));
        dispatch(setUpdateCanvas(false));
    }

    const updateContent = (text) => {
        let currentElements = [...elements];
        currentElements[selectedId].content = text;
        dispatch(updateElements(updatedElements));
    }

    return (
        <div
            style={elements[id].style}
            className={selectedId === id ? 'selected' : ''}
            onMouseEnter={() => setHighlighted(true)}
            onMouseLeave={() => setHighlighted(false)}
        >
            {elements[id].type === 'text' ? elements[id].content : ''}

            {selectedId === id || highlighted
                ? <Adjuster
                    styles={elements[id].style}
                    selected={selectedId === id}
                    setHighlighted={setHighlighted}
                    updateElementPosition={updateElementPosition}
                    commenceMovingElement={commenceMovingElement}
                    updateContent={updateContent}
                /> : ''
            }

        </div>
    );
}

export default Element;
