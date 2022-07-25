import '../Calculator.css';
import React from 'react';

// Create buttons for calculator.
const Buttons = (props) => {
    // Numbers.
    const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const symArr = ['+', '-', '/', '*', '=', 'C', 'CE', '.'];
    const numBtns = numArr.map((num) => {
        return(
            <button
                onClick={ e =>  props.numFunc(e.target.innerHTML) } 
                className="calcBtn" 
                key={num}>{num}
            </button>
        );
    });
    
    // Symbols.
    const symBtns = symArr.map((sym) => {
        return(
            <button
                onClick={ e =>  props.symFunc(e.target.innerHTML) } 
                className="calcBtn" 
                key={sym}
                value={sym}>{sym}
            </button>
        );
    });
    
    return (
            <div>
                <div>{numBtns.slice(7, 10)}{symBtns[2]}</div>
                <div>{numBtns.slice(4, 7)}{symBtns[3]}</div>
                <div>{numBtns.slice(1, 4)}{symBtns[4]}</div>
                <div>{numBtns[0]}{symBtns[symBtns.length - 1]}{symBtns[0]}{symBtns[5]}</div>
                <div style={{ textAlign: 'left' }}>{symBtns[6]}</div>
            </div>
        );
}

export default Buttons;