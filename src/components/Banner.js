import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../index.css';
import Element from './Element.js';

const Banner = () => {
    const bannerSize = useSelector(state => state.editor.bannerSize);
    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedId);
    const dispatch = useDispatch();

    return (
        <div
            className="banner"
            style={{width: `${bannerSize[0]}px`, height: `${bannerSize[1]}px`, background: "white"}}
        >
            {elements.map((element, i) => <Element key={i} id={i} />)}

        </div>
    );
}

export default Banner;
