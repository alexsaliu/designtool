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
    const [color, setColor] = useState('');
    const [border, setBorder] = useState([]);
    const [boxShadow, setBoxShadow] = useState('');
    const [borderRadius, setBorderRadius] = useState('');
    const [fontFamily, setFontFamily] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [textTransform, setTextTransform] = useState(0);
    const [link, setLink] = useState('');
    const [test, setTest] = useState('#000');
    const [colorPicker, setColorPicker] = useState('');

    const elements = useSelector(state => state.editor.elements);
    const id = useSelector(state => state.editor.selectedElementId);
    const canvasSize = useSelector(state => state.editor.canvasSize);
    const dispatch = useDispatch();

    useEffect(() => {
        if (elements.length && id >= 0) {
            const styles = {...elements[id].style};
            setLeft(getNumericValue(styles.left));
            setTop(getNumericValue(styles.top));
            setWidth(getNumericValue(styles.width));
            setHeight(getNumericValue(styles.height));
            setBackground(styles.background);
            setColor(styles.color);
            const borderColor = styles.border.split(' ')[2];
            setBorder([getNumericValue(styles.border), borderColor]);
            // setShadow(getNumericValue(styles.shadow));
            setBorderRadius(getNumericValue(styles.borderRadius));
            setFontFamily(styles.fontFamily);
            setFontSize(getNumericValue(styles.fontSize));
            const textTransformVal = styles.textTransform === 'lowercase' ? 'aa' : styles.textTransform === 'uppercase' ? 'AA' : 'Aa'
            setTextTransform(textTransformVal);
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

    const updateStyle = (value, style, color) => {
        let updatedElements = [...elements];
        switch (style) {
            case "background":
            case "color":
            case "fontFamily":
                value = `${value}`;
                break;
            case "borderRadius":
            case "fontSize":
                value = `${value}px`;
                break;
            case "border":
                value = `${value}px solid ${color}`;
                break;
            case "boxShadow":
                value = `0px 0px ${value}px 0px ${color}`;
                break;
            case "textTransform":
                value = textTransform === 'Aa' ? 'uppercase' : textTransform === 'AA' ? 'lowercase' : '';
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

    const handleChange = (color, style) => {
        switch(style) {
            case 'border':
                setBorder([border[0], color.hex]);
                break;
            case 'background':
                setBackground(color);
                break;
            default:
                return false;
        }
    };

    const picker = (type) => {
        colorPicker === type ? setColorPicker('') : setColorPicker(type);
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
                    {
                        elements[id].type === "element" || elements[id].type === "image" ?

                            <div className="style-section two">
                                <div className="style-container">
                                    <div className="style-label">Fill</div>
                                    <div className="style-value-container">
                                        <div className="color-box" onClick={() => picker("background")} style={{background: background}}></div>
                                        {colorPicker === "background"
                                            ?
                                            <div style={{transform: 'translateY(23px)', position: 'absolute'}}>
                                                <ChromePicker
                                                    color={ background }
                                                    onChange={ (val) => handleChange(val, "background") }
                                                    onChangeComplete={ (val) => updateStyle(val.hex, "background") }
                                                />
                                            </div>
                                            : ''
                                        }
                                        <input onChange={(e) => updateStyle(e.target.value, "background")} className="style-input" type="text"></input>
                                    </div>
                                </div>
                                <div className="style-container">
                                    <div className="style-label">Border</div>
                                    <div className="style-value-container">
                                        <div className="color-box" onClick={() => picker("border")} style={{background: border[1]}}></div>
                                        {colorPicker === "border"
                                            ?
                                            <div style={{transform: 'translateY(23px)', position: 'absolute'}}>
                                                <ChromePicker
                                                    color={ border[1] }
                                                    onChange={ (val) => handleChange(val, "border") }
                                                    onChangeComplete={ (val) => updateStyle(border[0], "border", val.hex) }
                                                />
                                            </div>
                                            : ''
                                        }
                                        <input onChange={(e) => updateStyle(e.target.value, "border", border[1])} value={border[0]} className="style-input" type="number"></input>
                                    </div>
                                </div>
                                <div className="style-container">
                                    <div className="style-label">Shadow</div>
                                    <div className="style-value-container">
                                        <div className="color-box" onClick={() => picker("boxShadow")} style={{background: boxShadow[1]}}></div>
                                        {colorPicker === "boxShadow"
                                            ?
                                            <div style={{transform: 'translateY(23px)', position: 'absolute'}}>
                                                <ChromePicker
                                                    color={ boxShadow }
                                                    onChange={ (val) => handleChange(val, "boxShadow") }
                                                    onChangeComplete={ (val) => updateStyle(boxShadow, "boxShadow", val.hex) }
                                                />
                                            </div>
                                            : ''
                                        }
                                        <input onChange={(e) => updateStyle(e.target.value, "boxShadow", "lightgrey")} className="style-input" type="number"></input>
                                    </div>
                                </div>
                                <div className="style-container">
                                    <div className="style-label">Radius</div>
                                    <input onChange={(e) => updateStyle(e.target.value, "borderRadius")} value={borderRadius} className="style-input" type="number"></input>
                                </div>
                            </div>

                        :

                            <div className="style-section three">
                                <div className="style-container">
                                    <div className="style-label">Font</div>
                                    <input onChange={(e) => updateStyle(e.target.value, "fontFamily")} value={elements[id].style.fontFamily} className="style-input" type="text"></input>
                                </div>
                                <div className="style-container">
                                    <div className="style-label">Size</div>
                                    <input onChange={(e) => updateStyle(e.target.value, "fontSize")} value={getNumericValue(elements[id].style.fontSize)} className="style-input" type="number"></input>
                                </div>
                                <div className="style-container" style={{'flexDirection': 'column', 'alignItems': 'flexStart'}}>
                                    <div className="style-label">Color</div>
                                    <div className="style-value-container">
                                        <div className="color-box" onClick={() => picker("color")} style={{background: color}}></div>
                                        {colorPicker === "color"
                                            ?
                                            <div style={{transform: 'translateY(23px)', position: 'absolute'}}>
                                                <ChromePicker
                                                    color={ color }
                                                    onChange={ (val) => handleChange(val, "color") }
                                                    onChangeComplete={ (val) => updateStyle(val.hex, "color") }
                                                />
                                            </div>
                                            : ''
                                        }
                                        <input onChange={(e) => updateStyle(e.target.value, "color")} className="style-input" type="text"></input>
                                    </div>
                                </div>
                                <div className="style-container">
                                    <div onClick={() => updateStyle(textTransform, "textTransform")} className="style-label">{textTransform}</div>
                                </div>
                            </div>
                    }
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
