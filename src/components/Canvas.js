import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../index.css';
import Element from './Element.js';

import {
    setUpdateCanvas,
    setSelectedElementId,
    updateElements
} from '../store/actions/actions.js';

const Canvas = () => {
    const canvasSize = useSelector(state => state.editor.canvasSize);
    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     document.addEventListener("keydown", (e) => deleteElement(e));
    // });

    // const deleteElement = (e) => {
    //     console.log(e);
    //     console.log(selectedId);
    //     if(selectedId >= 0 && e.keyCode === 8) {
    //         const elementsAfterDelete = [];
    //         for (let i = 0; i < elements.length; i++) {
    //             if (i === selectedId) {
    //                 console.log("OK");
    //                 break;
    //             }
    //             elementsAfterDelete.push({...elements[i]});
    //         }
    //         dispatch(updateElements(elementsAfterDelete));
    //         dispatch(setSelectedElementId(-1));
    //     }
    // }

    const deSelect = (e) => {
        dispatch(setSelectedElementId(-1));
    }

    return (
        <div
            className="canvas"
            style={{width: `${canvasSize[0]}px`, height: `${canvasSize[1]}px`, background: "white"}}
            onMouseUp={() => dispatch(setUpdateCanvas(true))}
        >
            {selectedId >= 0 ? <div onClick={() => deSelect()} className="deselect-element"></div> : ''}
            {elements.map((element, i) => <Element key={i} id={i} />)}
        </div>
    );
}

export default Canvas;
