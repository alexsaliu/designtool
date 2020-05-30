import React, { useState } from 'react';
import Transparent from './transparent.png';

const ColorPicker = () => {
    const [background, setBackground] = useState('#642BCD');

    const container = {
        width: '220px',
        height: '200px',
        background: '#fff',
        boxShadow: '2px 2px 3px 0px lightgrey',
        borderRadius: '5px'
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

    const colorSlider = {
        background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
        width: '100%',
        height: '12px',
        marginBottom: '5px'
    }

    const transparentSlider = {
        backgroundImage: `url(${Transparent})`,
        width: '100%',
        height: '12px',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat-x',
        marginBottom: '5px',
        filter: 'opacity(0.6)'
    }

    const changeHex = (e) => {
        setBackground(e.target.value);
    }

    return (
        <div style={container}>
            <div style={containerTop}>
                <div style={{...backgroundContainer, background: background}}></div>
                <div style={backgroundWhite}></div>
                <div style={backgroundBlack}></div>
            </div>
            <div style={containerBottom}>
                <div style={containerBottomLeft}>
                    <div style={{...sampleColor, background: background}}></div>
                </div>
                <div style={containerBottomRight}>
                    <div style={colorSlider}></div>
                    <div style={transparentSlider}></div>
                    <input onChange={(e) => changeHex(e)} style={hexInput} value={background} type="text" />
                </div>
            </div>
        </div>
    );
}

export default ColorPicker;
