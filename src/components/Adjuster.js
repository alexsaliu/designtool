import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Adjuster = ({ styles }) => {
    const [adjusterStyles, setAdjusterStyles] = useState({
        top: '0px',
        left: '0px',
    })

    useEffect(() => {
        let style = {...adjusterStyles};
        let parentBorder = styles.border.match(/\d+/);
        style.width = `calc(100% + ${parentBorder * 2}px)`;
        style.height = `calc(100% + ${parentBorder * 2}px)`;
        style.left = `-${parentBorder}px`;
        style.top = `-${parentBorder}px`;
        // console.log(style);
        setAdjusterStyles(style);
    }, [styles])


    return (
        <div style={adjusterStyles} className="adjuster-container">

            <div className="adjuster line left"></div>
            <div className="adjuster line top"></div>
            <div className="adjuster line right"></div>
            <div className="adjuster line bottom"></div>

            <div className="adjuster square top left"></div>
            <div className="adjuster square top right"></div>
            <div className="adjuster square bottom right"></div>
            <div className="adjuster square bottom left"></div>

            <div className="dimensions">{styles.width.match(/\d+/)[0]} x {styles.height.match(/\d+/)[0]}</div>

        </div>
    );
}

export default Adjuster;
