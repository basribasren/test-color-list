import React from 'react';
import './color-box.css'

const ColorBox = (props) => {
    return (
    	<div className="box-container" style={{backgroundColor: props.color, filter: `saturate(${props.saturate ? '0' : '1'})`}}>
        	<div>{props.color}</div> 
        </div>
    );
}

export default ColorBox;