import React from 'react';
import './index.css';

import Banner from './Banner.js';

const Editor = () => {

    const printDOM = () => {
        let html = document.querySelector('.banner-container').innerHTML;
        console.log(html);
    }

    return (
        <div className="editor">
        <div className="editor-panel">
            <button className="editor-button" onClick={() => printDOM()}>Print</button>
        </div>
            <div className="banner-container">
                <Banner />
            </div>
        </div>
    );
}

export default Editor;
