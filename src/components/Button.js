import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Button = ({ id }) => {
    const [selected, setSelected] = useState(false);
    const [highlighted, setHilighted] = useState(false);
    const [highlightStyles, setHighlightStyles] = useState({
        position: 'absolute',
        border: '2px solid #49beeb',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
    })

    const state = useSelector(state => state.editor.elements);

    useEffect(() => {
        let style = {...highlightStyles};
        let parentBorder = state[id].style.border.match(/\d+/)[0];
        style.width = `calc(100% + ${parentBorder * 2}px)`;
        style.height = `calc(100% + ${parentBorder * 2}px)`;
        style.left = `-${parentBorder}px`;
        style.top = `-${parentBorder}px`;
        console.log(style);
        setHighlightStyles(style);
    }, [state])



    const changeColor = () => {
        console.log("changecolor");
        // setStyles({...styles, background: 'orange'});
    }

    const highlightElement = () => {
        console.log("highlightElement");
    }

    const selectElement = () => {
        setSelected(!selected);
    }


    return (
        <div
            onMouseEnter={() => setHilighted(true)}
            onMouseLeave={() => setHilighted(false)}
            onClick={() => selectElement()} style={state[id].style}>
            Button
            {selected ? 'SELECTED' : ''}

            {highlighted ? <div style={highlightStyles}></div> : ''}
        </div>
    );
}

export default Button;
