import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../index.css';

import PanelTop from './PanelTop.js';
import PanelTwo from './PanelTwo.js';
import Canvas from './Canvas.js';
import PanelElementManager from './PanelElementManager.js';
import PanelStyles from './panelStyles/PanelStyles.js';

import {
    setMousePosition,
    setSelectedElementId
} from '../store/actions/actions.js';

const Editor = () => {

    const state = useSelector(state => state.editor);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const dispatch = useDispatch();

    const getMouseCoords = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        dispatch(setMousePosition([x,y]));
    }

    const deSelect = (e) => {
        dispatch(setSelectedElementId(-1));
    }

    return (
        <div className="editor">
            <PanelTop />
            <PanelTwo />
            <div onMouseMove={(e) => getMouseCoords(e)} className="editor-section three">
                <div className="canvas-container">
                    {selectedId >= 0 ? <div onClick={() => deSelect()} className="deselect-element"></div> : ''}
                    <Canvas />
                </div>
            </div>
            <PanelStyles />
            <PanelElementManager />
        </div>
    );
}

export default Editor;
