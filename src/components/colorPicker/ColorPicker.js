import React, { useState, useEffect } from 'react';
import Transparent from './transparent.png';

const ColorPicker = () => {
    const [background, setBackground] = useState('#642BCD');
    const [selectorPosition, setSelectorPosition] = useState([20, 20]);
    const [colorSliderPosition, setColorSliderPosition] = useState(10);
    const [transparentSliderPosition, setTransparentSliderPosition] = useState(15);
    const [moveColorSelector, setMoveColorSelector] = useState(false);
    const [moveColorSlider, setMoveColorSlider] = useState(false);
    const [moveTransparentSlider, setMoveTransparentSlider] = useState(false);

    useEffect(() => {
        convert(background);
    }, [background])


    const container = {
        width: '220px',
        height: '200px',
        background: '#fff',
        boxShadow: '2px 2px 3px 0px lightgrey',
        borderRadius: '5px',
        overflow: 'hidden',
        position: 'absolute',
        left: '10px',
        top: '10px'
    }

    const containerTop = {
        width: '100%',
        height: '62%',
        position: 'relative',
    }

    const containerBottom = {
        width: '100%',
        height: '38%',
        position: 'relative',
        display: 'flex',
        padding: '10px'
    }

    const containerBottomLeft = {
        width: '20%',
        height: '100%',
        marginRight: '10px'
    }

    const containerBottomRight = {
        width: '80%',
        height: '100%',
    }

    const backgroundContainer = {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }

    const backgroundWhite = {
        background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))',
        position: 'absolute',
        width: '100%',
        height: '100%'
    }

    const sampleColor = {
        width: '100%',
        height: '100%',
        borderRadius: '5px'
    }

    const hexInput = {
        border: '1px solid lightgrey',
        width: '100%',
        height: '20px',
        padding: '4px',
        fontSize: '11px',
        textAlign: 'center',
        borderRadius: '5px',
        color: 'grey',
        textTransform: 'uppercase'
    }

    const backgroundBlack = {
        background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        position: 'absolute',
        width: '100%',
        height: '100%'
    }

    const colorSliderBar = {
        background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
        width: '100%',
        height: '12px',
        marginBottom: '5px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    }

    const transparentSliderBar = {
        backgroundImage: `url(${Transparent})`,
        width: '100%',
        height: '12px',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat-x',
        marginBottom: '5px',
        filter: 'opacity(0.6)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    }

    const colorSelector = {
        width: '15px',
        height: '15px'
    }

    const slider = {
        width: '14px',
        height: '14px',
        border: '1px solid #ffffff',
        borderRadius: '14px',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const sliderShadow = {
        boxShadow: '0px 0px 3px 0px grey',
        transform: 'translate(-50%, 0%)',
        background: '#ffffff'
    }

    const sliderPoint = {
        width: '1px',
        height: '1px',
        background: '#ffffff',
    }

    const changeHex = (val) => {
        setBackground(val);
    }

    const convert = (val) => {
        console.log(val.length);
        // if (val[0] === "#") {
        //     console.log("value: ", val);
        //     // Convert Hex to RGB
        //     const rgb = [0,0,0];
        //     for (let i = 1; i <= rgb.length; i ++) {
        //         const n = parseInt(val[i] + val[i+1], 16);
        //         rgb.push(n => 0 ? n : 0);
        //     }
        //     console.log(rgb);
        // }
        // else {
        //     // Convert RGB to hex
        //     const hex = val.toString(16);
        //     console.log(hex);
        // }
    }

    return (
        <div style={container}>
            <div style={containerTop}>
                <div style={{...backgroundContainer, background: background}}></div>
                <div style={backgroundWhite}></div>
                <div style={backgroundBlack}></div>
                <div style={{...slider, ...colorSelector, left: `${selectorPosition[0]}%` ,top: `${selectorPosition[1]}%`,}}>
                    <div style={sliderPoint}></div>
                </div>
            </div>
            <div style={containerBottom}>
                <div style={containerBottomLeft}>
                    <div style={{...sampleColor, background: background}}></div>
                </div>
                <div style={containerBottomRight}>
                    <div style={colorSliderBar}>
                        <div style={{...slider, ...sliderShadow, left: `${colorSliderPosition}%`}}></div>
                    </div>
                    <div style={transparentSliderBar}>
                        <div style={{...slider, ...sliderShadow, left: `${transparentSliderPosition}%`}}></div>
                    </div>
                    <input onChange={(e) => changeHex(e.target.value)} style={hexInput} value={background} type="text" />
                </div>
            </div>
        </div>
    );
}

export default ColorPicker;
