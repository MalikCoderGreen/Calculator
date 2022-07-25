import '../Calculator.css';
import React, {useState} from 'react';

const OutputWindow = (props) => {
    return (
        <div className='output-window'>{props.pressed}</div>
    );

}


export default OutputWindow;