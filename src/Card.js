import React from 'react';
import './Card.css';

function Card( {image}) {
    return(
        <div className='Card'>
            <img src={image} alt='card' /> 
        </div>
    )
}

export default Card;