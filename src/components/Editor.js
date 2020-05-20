import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../index.css';

import Banner from './Banner.js';

import {
    updateElements,
    setSelectedElementId
} from '../store/actions/actions.js';

const Editor = () => {

    const state = useSelector(state => state.editor);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(state);
    });

    const printDOM = () => {
        let html = document.querySelector('.banner-container').innerHTML;
        console.log(html);
    }

    const createElement = (type) => {
        let elements = state.elements;
        const id = parseInt(elements.length);
        const newElement = {
            'id': id,
            'type': type,
            'style': {
                'left': '0px',
                'top': '0px',
                'width': '200px',
                'height': '100px',
                'fill': 'lightgreen',
                'border': '5px solid grey',
            },
            'content': ''
        }
        elements.push(newElement)
        dispatch(updateElements(elements))
        dispatch(setSelectedElementId(id))
    }

    return (
        <div className="editor">
            <div className="editor-section one">
                <button className="editor-button" onClick={() => createElement("button")}>button +</button>
                <button className="editor-button" onClick={() => printDOM()}>Print</button>
            </div>
            <div className="editor-section two">
                <div className="editor-panel">
                    2
                </div>
            </div>
            <div className="editor-section three">
                <div className="banner-container">
                    <Banner />
                </div>
            </div>
            <div className="editor-section four">
                <div className="editor-panel">
                    4
                </div>
            </div>
            <div className="editor-section five">
                <div className="editor-panel">
                    5
                </div>
            </div>
        </div>
    );
}

export default Editor;
