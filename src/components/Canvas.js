import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../index.css';
import Element from './Element.js';

import {
    setUpdateCanvas
} from '../store/actions/actions.js';

const Canvas = () => {
    const canvasSize = useSelector(state => state.editor.canvasSize);
    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedId);
    const dispatch = useDispatch();

    return (
        <div
            className="canvas"
            style={{width: `${canvasSize[0]}px`, height: `${canvasSize[1]}px`, background: "white"}}
            onMouseUp={() => dispatch(setUpdateCanvas(true))}
        >
            {elements.map((element, i) => <Element key={i} id={i} />)}

        </div>
    );
}

export default Canvas;
