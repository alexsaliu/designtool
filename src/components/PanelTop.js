import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../index.css';

import {
    updateElements,
    setSelectedElementId
} from '../store/actions/actions.js';

const PanelTop = () => {

    const state = useSelector(state => state.editor);
    const dispatch = useDispatch();

    const printDOM = () => {
        let html = document.querySelector('.canvas-container').innerHTML;
        console.log(html);
    }

    const createElement = (type) => {
        let elements = [...state.elements];
        const id = parseInt(elements.length);
        const newElement = {
            'id': id,
            'type': type,
            'style': {
                'left': '0px',
                'top': '0px',
                'width': '200px',
                'height': '100px',
                'zIndex': String(id),
                'background': '',
                'border': '1px solid grey',
                'borderRadius': '0px',
                'fontFamily': '',
                'fontSize': '',
                'textTransform': '',
                'boxShadow': '0px'
            },
            'content': '',
            'link': ''
        }
        elements.push(newElement)
        dispatch(updateElements(elements))
        dispatch(setSelectedElementId(id))
    }

    return (
        <div className="editor-section one">
            <button className="editor-button" onClick={() => createElement("button")}>Element</button>
            <button className="editor-button" onClick={() => printDOM()}>Print</button>
        </div>
    );
}

export default PanelTop;
