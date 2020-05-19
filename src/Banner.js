import React, { useState, useEffect } from 'react';
import './index.css';
import Button from './Button.js';

const Banner = () => {
    const [elements, setElements] = useState([]);
    const [buttonMode, setButtonMode] = useState(false);
    const [mouseCoords, setMouseCords] = useState([0,0]);
    const [elementStartingX, setElementStartingX] = useState(0);
    const [elementStartingY, setElementStartingY] = useState(0);
    const [elementWidth, setElementWidth] = useState(0);
    const [elementHeight, setElementHeight] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [phantomElement, setPhantomElement] = useState(false);

    useEffect(() => {
      console.log(elements);
    }, [elements]);

    const createButton = (coords) => {

        const left = elementStartingX;
        const top = elementStartingY;
        const width = Math.abs(coords[0] - left);
        const height = Math.abs(coords[1] - top);

        console.log(left);
        console.log(top);
        console.log(width);
        console.log(height);

        const newElement = {
            "styles": {
                left,
                top,
                width,
                height,
                border: '1px solid grey'
            },
            "content": 'button hey'
        }
        let currentElements = elements;
        currentElements.push(newElement);
        setElements([...currentElements]);
        // console.log(elements);
        // return <Button settings={settings} />;
    }

    const getMouseCoords = (e) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        // console.log("x" + x + " y" + y);
        const left = elementStartingX;
        const top = elementStartingY;
        setElementWidth(Math.abs(x - left));
        setElementHeight(Math.abs(y - top))
        return [x,y];
        // console.log(mouseCoords);
        // console.log(e.nativeEvent);
    }

    const startElement = (e) => {
        console.log("Start");
        setPhantomElement(true);
        const coords = getMouseCoords(e);
        setElementStartingX(coords[0]);
        setElementStartingY(coords[1]);
    }

    const endElement = (e) => {
        console.log("End");
        const coords = getMouseCoords(e);
        createButton(coords);
        setPhantomElement(false);
    }

    return (
        <div
            className="banner"
            style={{width: "800px", height: "235px", background: "white"}}
            onMouseDown={(e) => startElement(e)}
            onMouseUp={(e) => endElement(e)}
            onMouseMove={(e) => getMouseCoords(e)}
        >
            {/* <button style={buttonMode ? {border: "7px dashed lightgreen"} : {}} className="editor-button" onClick={() => setButtonMode(!buttonMode)}>button +</button> */}
            {phantomElement ?
                <div style={{left: `${elementStartingX}px`, top: `${elementStartingY}px`, width: `${elementWidth}px`, height: `${elementHeight}px`, border: '1px solid grey'}}></div> : ''
            }
        </div>
    );
}

export default Banner;
