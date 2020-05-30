import React from 'react';
import './index.css';
import Editor from './components/Editor.js';
import ColorPicker from './components/colorPicker/ColorPicker.js';

function App() {
    return (
        <div className="App">
            <ColorPicker />
        </div>
    );
}

export default App;
