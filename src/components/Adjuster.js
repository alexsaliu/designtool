import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getNumericValue } from '../helpers.js';

import {
    updateElements
} from '../store/actions/actions.js';

const Adjuster = ({ styles, selected, highlighted, setHighlighted, updateElementPosition, commenceMovingElement }) => {
    const [adjusterStyles, setAdjusterStyles] = useState({});

    const isMoving = useSelector(state => state.editor.movingElement);

    useEffect(() => {
        let style = {};
        let parentBorder = styles.border ? getNumericValue(styles.border) : 0;
        let left = getNumericValue(styles.left) - parentBorder / 2;
        let top = getNumericValue(styles.top) - parentBorder / 2;
        style.width = `${styles.width}`;
        style.height = `${styles.height}`;
        style.left = `-${parentBorder}px`;
        style.top = `-${parentBorder}px`;
        setAdjusterStyles(style);
    }, [styles])

    if (styles) {
        return (
            <div
                style={adjusterStyles}
                className="adjuster-container"
            >
                <div
                    className="adjuster-dragger"
                    onMouseLeave={() => {setHighlighted(false); updateElementPosition()}}
                    onMouseDown={() => commenceMovingElement()}
                    onMouseUp={() => updateElementPosition()}
                >
                </div>

                { !isMoving && selected ? <div className="adjuster line left"></div> : ''}
                { !isMoving && selected ? <div className="adjuster line top"></div> : ''}
                { !isMoving && selected ? <div className="adjuster line right"></div> : ''}
                { !isMoving && selected ? <div className="adjuster line bottom"></div> : ''}

                { !isMoving && selected ? <div className="adjuster square top left"></div> : ''}
                { !isMoving && selected ? <div className="adjuster square top right"></div> : ''}
                { !isMoving && selected ? <div className="adjuster square bottom right"></div> : ''}
                { !isMoving && selected ? <div className="adjuster square bottom left"></div> : ''}

                { !isMoving && selected ? <div className="dimensions">{styles.width.match(/\d+/)[0]} x {styles.height.match(/\d+/)[0]}</div> : ''}

            </div>
        );
    }
}

export default Adjuster;
