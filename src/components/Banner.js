import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../index.css';
import Element from './Element.js';

const Banner = () => {
    const state = useSelector(state => state.editor);
    const dispatch = useDispatch();

    return (
        <div
            className="banner"
            style={{width: "800px", height: "235px", background: "white"}}
        >
            {state.elements.map((element, i) => <Element key={i} id={i} />)}

        </div>
    );
}

export default Banner;
