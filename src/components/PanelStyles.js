import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../index.css';

import {
    getNumericValue,
    getUpdatedElementPosition
} from '../helpers.js';

import {
    updateElements
} from '../store/actions/actions.js';

const PanelStyles = () => {
    // const [updatedElements, setUpdatedElements] = useState([]);

    const elements = useSelector(state => state.editor.elements);
    const id = useSelector(state => state.editor.selectedElementId);
    const dispatch = useDispatch();

    useEffect(() => {
        // setUpdatedElements([...elements]);
        console.log(elements);
    }, [elements])

    const setPosition = (e, dimensions, style) => {
        const startingElementStyles = {...elements[id].style};
        const currentPosition = [getNumericValue(startingElementStyles.left), getNumericValue(startingElementStyles.top)];
        const newPosition = [style === "left" ? e.target.value : 0, style === "top" ? e.target.value : 0];
        let updatedElements = getUpdatedElementPosition(elements, id, startingElementStyles, currentPosition, newPosition, dimensions);
        dispatch(updateElements(updatedElements));
    }

    if (id >= 0) {
        return (
            <div className="editor-section five">
                <div className="editor-panel">
                    <div className="style-section">
                        <div className="style-container">
                            <div className="style-label">x</div>
                            <input onChange={(e) => setPosition(e, {left: true}, "left")} value={getNumericValue(elements[id].style.left)} className="style-input" type="number"></input>
                        </div>
                        <div className="style-container">
                            <div className="style-label">y</div>
                            <input onChange={(e) => setPosition(e, {top: true}, "top")} value={getNumericValue(elements[id].style.top)} className="style-input" type="number"></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>Nothing selected</div>
        );
    }
}

export default PanelStyles;
