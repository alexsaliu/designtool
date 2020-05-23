import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../index.css';

import PanelTop from './PanelTop.js';
import PanelTwo from './PanelTwo.js';
import Banner from './Banner.js';
import PanelElementManager from './PanelElementManager.js';
import PanelStyles from './PanelStyles.js';

import {
    setMousePosition
} from '../store/actions/actions.js';

const Editor = () => {

    const state = useSelector(state => state.editor);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log(state);
    // });

    const getMouseCoords = (e) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        dispatch(setMousePosition([x,y]));
    }

    return (
        <div className="editor">
            <PanelTop />
            <PanelTwo />
            <div onMouseMove={(e) => getMouseCoords(e)} className="editor-section three">
                <div className="banner-container">
                    <Banner />
                </div>
            </div>
            <PanelElementManager />
            <PanelStyles />
        </div>
    );
}

export default Editor;
