import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../index.css';

import {
    getNumericValue,
    getUpdatedElementPosition
} from '../../helpers.js';

import {
    updateElements
} from '../../store/actions/actions.js';

const PanelStyles = () => {
    // const [updatedElements, setUpdatedElements] = useState([]);

    const elements = useSelector(state => state.editor.elements);
    const id = useSelector(state => state.editor.selectedElementId);
    const canvasSize = useSelector(state => state.editor.canvasSize);
    const dispatch = useDispatch();

    const setPosition = (e, dimensions, style) => {
        const startingElementStyles = {...elements[id].style};
        const startingLeft = getNumericValue(startingElementStyles.left);
        const startingTop = getNumericValue(startingElementStyles.top);
        const startingWidth = getNumericValue(startingElementStyles.width);
        const startingHeight = getNumericValue(startingElementStyles.height);
        const currentPosition = [dimensions.left ? startingLeft : startingWidth, dimensions.top ? startingTop : startingHeight];
        const newPosition = [dimensions.left || dimensions.width ? e.target.value : 0, dimensions.top || dimensions.height ? e.target.value : 0];
        let updatedElements = getUpdatedElementPosition(elements, id, startingElementStyles, currentPosition, newPosition, dimensions, canvasSize);
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
                        <div className="style-container">
                            <div className="style-label">w</div>
                            <input onChange={(e) => setPosition(e, {width: true}, "width")} value={getNumericValue(elements[id].style.width)} className="style-input" type="number"></input>
                        </div>
                        <div className="style-container">
                            <div className="style-label">h</div>
                            <input onChange={(e) => setPosition(e, {height: true}, "height")} value={getNumericValue(elements[id].style.height)} className="style-input" type="number"></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="editor-section five"></div>
        );
    }
}

export default PanelStyles;
