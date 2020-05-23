import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getNumericValue } from '../helpers.js';

import {
    updateElements
} from '../store/actions/actions.js';

const Adjuster = ({ styles }) => {
    const [adjusterStyles, setAdjusterStyles] = useState({});

    const isMoving = useSelector(state => state.editor.movingElement);

    useEffect(() => {
        let style = {};
        let parentBorder = styles.border ? getNumericValue(styles.border) : 0;
        let right = getNumericValue(styles.width) + parentBorder * 2;
        let bottom = getNumericValue(styles.height) + parentBorder * 2;
        style.left = `-${parentBorder}px`;
        style.top = `-${parentBorder}px`;
        style.right = `-${right}px`;
        style.bottom = `-${bottom}px`;

        setAdjusterStyles(style);
    }, [styles])

    const positionAdjusterFrameOnElement = () => {
        //left

        //right
        //top
        //bottom
    }

    if (styles) {
        return (
            <div style={{left: adjusterStyles.left, top: adjusterStyles.top}} className="adjuster-container">
            { !isMoving ?
                <div>
                    <div style={{}} className="adjuster square top left"></div>
                    <div className="adjuster square top right"></div>
                    <div className="adjuster square bottom right"></div>
                    <div className="adjuster square bottom left"></div>

                    <div style={{height: `${styles.height}`}} className="adjuster line left"><div className="line-color vertical"></div></div>
                    <div style={{width: `${styles.width}`}} className="adjuster line top"><div className="line-color horizontal"></div></div>
                    <div style={{height: `${styles.height}`, right: `${adjusterStyles.right}`}} className="adjuster line right"><div className="line-color vertical"></div></div>
                    <div style={{width: `${styles.width}`, bottom: `${adjusterStyles.bottom}`}} className="adjuster line bottom"><div className="line-color horizontal"></div></div>
                </div> : ''
            }

            <div className="dimensions">{styles.width.match(/\d+/)[0]} x {styles.height.match(/\d+/)[0]}</div>

            </div>
        );
    }
}

export default Adjuster;
