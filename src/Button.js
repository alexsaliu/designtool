import React, { useState } from 'react';

const Button = () => {
    const [styles, setStyles] = useState({
        width: '100px',
        height: '50px',
        background: 'lightblue',
    })

    const changeColor = () => {
        setStyles({...styles, background: 'orange'});
    }

    return (
        <div onClick={() => changeColor()} style={styles}>
            Button
        </div>
    );
}

export default Button;
