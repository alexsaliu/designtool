import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getNumericValue } from '../helpers.js';

import {
    updateElements,
    setSelectedElementId
} from '../store/actions/actions.js';

const Adjuster = ({
    styles,
    selected,
    highlighted,
    setHighlighted,
    updateElementPosition,
    commenceMovingElement,
    updateElementDimensions,
    commenceAdjustingElement
}) => {
    const [adjusterStyles, setAdjusterStyles] = useState({});

    const isMoving = useSelector(state => state.editor.movingElement);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const elements = useSelector(state => state.editor.elements);
    const dispatch = useDispatch();

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

    const deleteElement = (e) => {
        if(e.keyCode === 8) {
            let elementsAfterDelete = [];
            for (let i = 0; i < elements.length; i++) {
                if (i === selectedId) continue;
                elementsAfterDelete.push({...elements[i]});
            }
            console.log("elementsAfterDelete: ", elementsAfterDelete);
            dispatch(updateElements(elementsAfterDelete));
            dispatch(setSelectedElementId(-1));
        }
    }

    if (styles) {
        return (
            <div
                style={adjusterStyles}
                className="adjuster-container"
            >
                <div
                    className="adjuster-dragger"
                    onMouseDown={(e) => commenceMovingElement({left: true, top: true})}
                >
                    <input autoFocus onKeyDown={(e) => deleteElement(e)} type="text" readOnly />
                </div>

                { !isMoving && selected ? <div onMouseDown={() => commenceMovingElement({left: true, width: true})} className="adjuster line left"></div> : ''}
                { !isMoving && selected ? <div onMouseDown={() => commenceMovingElement({top: true, height: true})} className="adjuster line top"></div> : ''}
                { !isMoving && selected ? <div onMouseDown={() => commenceMovingElement({width: true})} className="adjuster line right"></div> : ''}
                { !isMoving && selected ? <div onMouseDown={() => commenceMovingElement({height: true})} className="adjuster line bottom"></div> : ''}

                { !isMoving && selected ? <div onMouseDown={() => commenceMovingElement({left: true, top: true, width: true, height: true})} className="adjuster square top left"></div> : ''}
                { !isMoving && selected ? <div onMouseDown={() => commenceMovingElement({top: true, width: true, height: true})} className="adjuster square top right"></div> : ''}
                { !isMoving && selected ? <div onMouseDown={() => commenceMovingElement({width: true, height: true})} className="adjuster square bottom right"></div> : ''}
                { !isMoving && selected ? <div onMouseDown={() => commenceMovingElement({left: true, width: true, height: true})} className="adjuster square bottom left"></div> : ''}

                { !isMoving && selected ? <div className="dimensions">{styles.width.match(/\d+/)[0]} x {styles.height.match(/\d+/)[0]}</div> : ''}

            </div>
        );
    }
}

export default Adjuster;
