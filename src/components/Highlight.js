import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getNumericValue } from '../helpers.js';

const Highlight = ({ styles }) => {
    const [highlightStyles, setHighlightStyles] = useState({})

    useEffect(() => {
        let style = {};
        let parentBorder = styles.border ? getNumericValue(styles.border) : 0;
        let left = getNumericValue(styles.left) - parentBorder / 2;
        let top = getNumericValue(styles.top) - parentBorder / 2;
        style.width = styles.width;
        style.height = styles.height;
        style.left = `-${parentBorder}px`;
        style.top = `-${parentBorder}px`;
        // console.log(style);
        setHighlightStyles(style);
    }, [styles])


    return (
        <div className="highlight-box" style={highlightStyles}></div>
    );
}

export default Highlight;
