import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../index.css';

import { ChromePicker } from 'react-color';
import ColorPicker from '../colorPicker/ColorPicker.js';

import {
    getNumericValue,
    getUpdatedElementPosition
} from '../../helpers.js';

import {
    updateElements
} from '../../store/actions/actions.js';

const PanelStyles = () => {
    const [left, setLeft] = useState('');
    const [top, setTop] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [background, setBackground] = useState('');
    const [border, setBorder] = useState([]);
    const [boxShadow, setBoxShadow] = useState('');
    const [borderRadius, setBorderRadius] = useState('');
    const [fontFamily, setFontFamily] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [textTransform, setTextTransform] = useState('');
    const [link, setLink] = useState('');
    const [test, setTest] = useState('#000');

    const elements = useSelector(state => state.editor.elements);
    const id = useSelector(state => state.editor.selectedElementId);
    const canvasSize = useSelector(state => state.editor.canvasSize);
    const dispatch = useDispatch();

    useEffect(() => {
        if (elements.length) {
            const styles = {...elements[id].style};
            setLeft(getNumericValue(styles.left));
            setTop(getNumericValue(styles.top));
            setWidth(getNumericValue(styles.width));
            setHeight(getNumericValue(styles.height));
            setBackground(styles.background);
            const borderColor = styles.border.split(' ')[2];
            setBorder([getNumericValue(styles.border), borderColor]);
            // setShadow(getNumericValue(styles.shadow));
            setBorderRadius(getNumericValue(styles.borderRadius));
            setFontFamily(styles.fontFamily);
            setFontSize(getNumericValue(styles.fontSize));
            setTextTransform(styles.textTransform);
            setLink(elements[id].link);
        }
    }, [elements])

    const setPosition = (e, dimensions) => {
        const startingElementStyles = {...elements[id].style};
        const currentPosition = [dimensions.left ? left : width, dimensions.top ? top : height];
        const newPosition = [dimensions.left || dimensions.width ? e.target.value : 0, dimensions.top || dimensions.height ? e.target.value : 0];
        let updatedElements = getUpdatedElementPosition(elements, id, startingElementStyles, currentPosition, newPosition, dimensions, canvasSize);
        dispatch(updateElements(updatedElements));
    }

    const updateStyle = (e, style, color) => {
        let updatedElements = [...elements];
        let value = e.target.value;
        console.log(style, color);
        switch (style) {
            case "background":
                value = `#${value}`;
                break;
            case "borderRadius":
                value = `${value}px`;
                break;
            case "border":
                value = `${value}px solid ${color}`;
                break;
            case "boxShadow":
                value = `0px 0px ${value}px 0px ${color}`;
                break;
            default:
                break;
        }
        let newStyle = {};
        newStyle[style] = value;
        updatedElements[id].style = {
            ...updatedElements[id].style,
            ...newStyle
        };
        dispatch(updateElements(updatedElements));
    }

    const handleChange = (color) => {
      setTest(color.hex);
    };

    const handleChangeComplete = (color) => {
      setTest(color.hex);
    }

    if (id >= 0) {
        return (
            <div className="editor-section five">
                <div className="editor-panel">
                    <div className="style-section">
                        <div className="style-container">
                            <div className="style-label">X</div>
                            <input onChange={(e) => setPosition(e, {left: true})} value={getNumericValue(elements[id].style.left)} className="style-input" type="number"></input>
                        </div>
                        <div className="style-container">
                            <div className="style-label">Y</div>
                            <input onChange={(e) => setPosition(e, {top: true})} value={getNumericValue(elements[id].style.top)} className="style-input" type="number"></input>
                        </div>
                        <div className="style-container">
                            <div className="style-label">W</div>
                            <input onChange={(e) => setPosition(e, {width: true})} value={getNumericValue(elements[id].style.width)} className="style-input" type="number"></input>
                        </div>
                        <div className="style-container">
                            <div className="style-label">H</div>
                            <input onChange={(e) => setPosition(e, {height: true})} value={getNumericValue(elements[id].style.height)} className="style-input" type="number"></input>
                        </div>
                    </div>
                    <div className="style-section two">
                        <div className="style-container">
                            <div className="style-label">Fill</div>
                            <div className="style-value-container">
                                <div className="color-box"></div>
                                <input onChange={(e) => updateStyle(e, "background")} className="style-input" type="text"></input>
                            </div>
                        </div>
                        <div className="style-container">
                            <div className="style-label">Border</div>
                            <div className="style-value-container">
                                <div className="color-box">
                                    <ChromePicker
                                      color={ test }
                                      onChange={ (val) => handleChange(val) }
                                      onChangeComplete={ (val) => handleChangeComplete(val) }
                                    />
                                </div>
                                <input onChange={(e) => updateStyle(e, "border", "red")} value={border[0]} className="style-input" type="number"></input>
                            </div>
                        </div>
                        <div className="style-container">
                            <div className="style-label">Shadow</div>
                            <div className="style-value-container">
                                <div className="color-box"></div>
                                <input onChange={(e) => updateStyle(e, "boxShadow", "lightgrey")} className="style-input" type="number"></input>
                            </div>
                        </div>
                        <div className="style-container">
                            <div className="style-label">Radius</div>
                            <input onChange={(e) => updateStyle(e, "borderRadius")} value={borderRadius} className="style-input" type="number"></input>
                        </div>
                    </div>
                    <div className="style-section three">
                        <div className="style-container">
                            <div className="style-label">Font</div>
                            <input onChange={(e) => updateStyle()} value={getNumericValue(elements[id].style.height)} className="style-input" type="number"></input>
                        </div>
                        <div className="style-container">
                            <div className="style-label">Size</div>
                            <input onChange={(e) => updateStyle()} value={getNumericValue(elements[id].style.height)} className="style-input" type="number"></input>
                        </div>
                        <div className="style-container">
                            <div className="style-label">Aa</div>
                            <input onChange={(e) => updateStyle()} value={getNumericValue(elements[id].style.height)} className="style-input" type="number"></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="editor-section five"></div>
        );
    }
}

export default PanelStyles;
