import React from 'react';
import '../index.css';

import Banner from './Banner.js';

const Editor = () => {

    const printDOM = () => {
        let html = document.querySelector('.banner-container').innerHTML;
        console.log(html);
    }

    return (
        <div className="editor">
            <div className="editor-section one">
                <button className="editor-button" onClick={() => printDOM()}>Print</button>
            </div>
            <div className="editor-section two">
                <div className="editor-panel">
                    2
                </div>
            </div>
            <div className="editor-section three">
                <div className="banner-container">
                    <Banner />
                </div>
            </div>
            <div className="editor-section four">
                <div className="editor-panel">
                    4
                </div>
            </div>
            <div className="editor-section five">
                <div className="editor-panel">
                    5
                </div>
            </div>
        </div>
    );
}

export default Editor;
