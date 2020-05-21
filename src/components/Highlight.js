import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Highlight = ({ styles }) => {
    const [highlightStyles, setHighlightStyles] = useState({
        top: '0px',
        left: '0px',
    })

    useEffect(() => {
        let style = {...highlightStyles};
        let parentBorder = styles.border.match(/\d+/)[0];
        style.width = `calc(100% + ${parentBorder * 2}px)`;
        style.height = `calc(100% + ${parentBorder * 2}px)`;
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
